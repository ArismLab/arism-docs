import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Footer from '@components/Footer'
import Header from '@components/Header'
import Link from '@components/Link'
import Logo from '@components/Logo'
import Navigation from '@components/Navigation'
import Prose from '@components/Prose'
import SectionProvider from '@components/SectionProvider'
import { internalLinks } from '@data/siteMetadata.json'
import kebabCase from '@libs/kebabCase'

import HeroPattern from './HeroPattern'
import { HomeSEO, PageSEO } from './PageSEO'

const PageLayout = ({ children, sections = []}) => {
  const router = useRouter()
  const path = router.asPath.split('#')[0].split('?')[0]
  const info = internalLinks.flatMap(section => section.links).find(link => link.href === path)

  const chapterLinks = internalLinks.map(section => section.links)
  const acceptedLinks = internalLinks.map(chapter => `/${kebabCase(chapter.title)}`)

  useEffect(() => {
    if (acceptedLinks.includes(path)) {
      const chapterLink = chapterLinks[acceptedLinks.indexOf(path)]
      router.push(chapterLink[0].href)
    }
  }, [])

	return (
    <SectionProvider sections={sections}>
      {
        path === '/' ? <HomeSEO /> : <PageSEO title={info?.title} description={info?.description} />
      }
			<HeroPattern />
			<div className="lg:ml-72 xl:ml-80">
				<motion.header
					layoutScroll
					className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
				>
					<div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80 2xl:w-96">
						<div className="hidden lg:flex">
							<Link href="/" aria-label="Home">
								<Logo className="h-6" />
							</Link>
						</div>
						<Header />
						<Navigation className="hidden lg:mt-10 lg:block" />
					</div>
				</motion.header>
				<div className="relative px-4 pt-14 sm:px-6 lg:px-8">
					<main className="py-16">
						<Prose as="article">{children}</Prose>
					</main>
					<Footer />
				</div>
			</div>
		</SectionProvider>
	)
}

export default PageLayout
