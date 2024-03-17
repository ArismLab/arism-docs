import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Fragment, forwardRef, useEffect, useRef } from 'react'

import AlgoliaIcon from '@components/icons/AlgoliaIcon'
import LoadingIcon from '@components/icons/LoadingIcon'
import SearchIcon from '@components/icons/SearchIcon'
import { useAutocomplete } from '@hooks/search'

import SearchResults from './SearchResults'

const SearchInput = forwardRef(
	({ autocomplete, autocompleteState, onClose }: any, inputRef): any => {
		const inputProps = autocomplete.getInputProps({})

		return (
			<div className="group relative flex h-12">
				<SearchIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
				<input
					ref={inputRef}
					className={clsx(
						'flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
						autocompleteState.status === 'stalled' ? 'pr-11' : 'pr-4'
					)}
					{...inputProps}
					onKeyDown={(event) => {
						if (
							event.key === 'Escape' &&
							!autocompleteState.isOpen &&
							autocompleteState.query === ''
						) {
							// In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
							// bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
							;(document.activeElement as any).blur()
							onClose()
						} else {
							inputProps.onKeyDown(event)
						}
					}}
				/>
				{autocompleteState.status === 'stalled' && (
					<div className="absolute inset-y-0 right-3 flex items-center">
						<LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-primary-400" />
					</div>
				)}
			</div>
		)
	}
)

const SearchDialog = ({ open, setOpen, className }) => {
	const router = useRouter()
	const formRef = useRef()
	const panelRef = useRef()
	const inputRef = useRef()
	const { autocomplete, autocompleteState }: any = useAutocomplete()

	useEffect(() => {
		if (!open) {
			return
		}

		function onRouteChange() {
			setOpen(false)
		}

		router.events.on('routeChangeStart', onRouteChange)
		router.events.on('hashChangeStart', onRouteChange)

		return () => {
			router.events.off('routeChangeStart', onRouteChange)
			router.events.off('hashChangeStart', onRouteChange)
		}
	}, [open, setOpen, router])

	useEffect(() => {
		if (open) {
			return
		}

		function onKeyDown(event) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setOpen(true)
			}
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [open, setOpen])

	return (
		<Transition.Root
			show={open}
			as={Fragment}
			afterLeave={() => autocomplete.setQuery('')}
		>
			<Dialog
				onClose={setOpen}
				className={clsx('fixed inset-0 z-50', className)}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm dark:bg-black/40" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="ring-zinc-900/7.5 mx-auto overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 dark:bg-zinc-900 dark:ring-zinc-800 sm:max-w-xl">
							<div {...autocomplete.getRootProps({})}>
								<form
									ref={formRef}
									{...(autocomplete.getFormProps({
										inputElement: inputRef.current as any,
									}) as any)}
								>
									<SearchInput
										ref={inputRef}
										autocomplete={autocomplete}
										autocompleteState={autocompleteState}
										onClose={() => setOpen(false)}
									/>
									<div
										ref={panelRef}
										className="dark:bg-white/2.5 border-t border-zinc-200 bg-white empty:hidden dark:border-zinc-100/5"
										{...(autocomplete.getPanelProps({}) as any)}
									>
										{autocompleteState.isOpen && (
											<>
												<SearchResults
													autocomplete={autocomplete}
													query={autocompleteState.query}
													collection={autocompleteState.collections[0]}
												/>
												<p className="flex items-center justify-end gap-2 border-t border-zinc-100 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
													Search by{' '}
													<AlgoliaIcon className="h-4 fill-[#003DFF] dark:fill-zinc-400" />
												</p>
											</>
										)}
									</div>
								</form>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default SearchDialog
