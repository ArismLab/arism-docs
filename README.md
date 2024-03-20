<div align="center">
    <h1>Arism Wallet whitepaper</h1>
    <em>Arism Wallet is a distributed key and identifier management protocol powered by Zero Knowledge. This decentralized wallet application uses advanced cryptographic algorithms to ensure the security and integrity of user's private keys.</em>
    <br/>
    <br/>
    <a href="https://arism.org">arism.org</a> © 2024
</div>

---

<div align="center">
    <h2>Table of contents</h2>
</div>

-   [I. Architecture](#i-architecture)
    -   [1. ARM Token](#1-arm-token)
    -   [2. Arism Node](#2-arism-node)
        -   [2.1. Validation Node](#21-validation-node)
        -   [2.2. Whitelist Node (Backup Node)](#22-whitelist-node-backup-node)
        -   [2.3. Supervised Node](#23-supervised-node)
        -   [2.4. Node lifecycle](#24-node-lifecycle)
        -   [2.5. Rewards and fines](#25-rewards-and-fines)
        -   [2.6. Voting Event](#26-voting-event)
-   [II. Terminologies and conventions](#ii-terminologies-and-conventions)
    -   [1. Application side](#1-application-side)
    -   [2. Network side](#2-network-side)
-   [III. Mechanisms](#iii-mechanisms)
    -   [1. Keystore mechanisms (application side)](#1-keystore-mechanisms-application-side)
        -   [1.1. Theorem 1 - Client Key \& Factor definition](#11-theorem-1---client-key--factor-definition)
        -   [1.2. Theorem 2 - Distributed Key Generation (DKG)](#12-theorem-2---distributed-key-generation-dkg)
        -   [1.3. Theorem 3 - Network Key \& Factor definition](#13-theorem-3---network-key--factor-definition)
        -   [1.4. Theorem 4 - Shamir's Secret Sharing (SSS)](#14-theorem-4---shamirs-secret-sharing-sss)
        -   [1.5. Theorem 5 - Device Key \& Factor definition](#15-theorem-5---device-key--factor-definition)
        -   [1.6. Theorem 6 - Private Key retrieval technique](#16-theorem-6---private-key-retrieval-technique)
        -   [1.7. Theorem 7 - Multi-Factor Authentication (MFA)](#17-theorem-7---multi-factor-authentication-mfa)
        -   [1.8. Theorem 8 - Recovery Key \& Factor definition](#18-theorem-8---recovery-key--factor-definition)
        -   [1.9. Theorem 9 - Private Key retrieval threshold](#19-theorem-9---private-key-retrieval-threshold)
    -   [2. Dead node handling mechanisms (network side)](#2-dead-node-handling-mechanisms-network-side)
        -   [2.1. Theorem 10 - Interchangeable Secret Sharing (ISS)](#21-theorem-10---circularly-protecting-secret-sharing-cpss)
        -   [2.1. Theorem 11 - Recoverable Secret Sharing (RSS)](#21-theorem-11---consensually-recovering-secret-sharing-crss)
    -   [3. Integrity preservation mechanism (network side)](#3-integrity-preservation-mechanism-network-side)
        -   [3.1. Theorem 12 - Proactive Secret Sharing (PSS)](#31-theorem-12---proactive-secret-sharing-pss)
        -   [3.2. Theorem 13 - Verifiable Secret Sharing (VSS)](#32-theorem-13---pedersen-verifiable-secret-sharing-pvss)
-   [IV. Notes](#iv-notes)
-   [V. Future implementations](#v-future-implementations)

---

# I. Architecture

## 1. ARM Token

**ARM Token** (or **Arism Token**) is a Fungible Token for staking, rewarding and fining in operating **Arism Nodes**.

## 2. Arism Node

**Arism Node** operator will prepare an available server (or device) with a staked amount of **ARM Token**.

The **Arism Network** is a distributed network linked together by 5 **Validation Nodes**.

### 2.1. Validation Node

**Validation Nodes** are the **Arism Nodes** which joining into the main network for executing algorithms to verify third-party accounts which users used for registering their accounts.

### 2.2. Whitelist Node (Backup Node)

**Whitelist Nodes** are the **Arism Nodes** which are in the queue to become **Validation Nodes**.

### 2.3. Supervised Node

This is part of the **Interchangeable Secret Sharing (ISS)** algorithm, to ensure that when a **Validation Node** dies, it will still be possible to generate **Network Keys** as long as the number of dead Nodes is below a certain threshold or conditions.

One **Validation Node** will supervise the other **Validation Node**. When a node dies, the node that is supervising it will take care of performing the algorithm for it.

However, a node will only be able to supervise JUST ONE other node. All node must monitor another node circularly, because if a node monitors on 2 or more other nodes, it can find or manipulate the **Network Key** (which will be mentioned later).

### 2.4. Node lifecycle

**Validation Node**'s lifetime is determined based on the staked amount of **ARM Token** and the number of **Whitelist Nodes** in the queue.

This ensures a degree of decentralization, preventing node operators from colluding with each other to damage the integrity and security of the network.

### 2.5. Rewards and fines

**Validation Nodes** will receive rewards periodically for their work. **Whitelist Nodes** will receive a portion of the rewards as well because they still have to work continuously while waiting for a **Voting Event**.

If a **Validation Node** is found to be dead or malicious, it will be fined and removed from the **Arism Network**. It will not be able to withdraw the entire staked amount of **ARM Token** because it will be deducted from a fine amount.

The reward amount will be calculated based on the staked amount and waiting/working time, while the fine amount will be calculated based on the remaining time it still has before the deadline.

### 2.6. Voting Event

**Validation Nodes** will be randomly selected from **Whitelist Nodes** (but with priority on the staked amount of **ARM Tokens**), meaning that **Whitelist Nodes** with the most staked amount of **ARM Tokens** will have a high chance of participating into **Arism Network** as a **Validation Node** when there is an **Validation Node** dies or expires.

Nodes will be managed on a **Smart Contract** and voting will also be executed on the **Smart Contract** as well to ensure the transparency property. This will happen automatically between **Validation Nodes** whenever a node detects (or requests) of a dead or malicious node, such a node is called **Victim Node**.

Of course, a positive vote will be cast if a node finds the **Victim Node** active, a negative vote will be cast if a node finds the **Victim Node** dead or malicious. Absolutely no human intervention.

# II. Terminologies and conventions

## 1. Application side

There are some cryptographic algorithms on the application side:

-   **Distributed Key Generation (DKG)**: An algorithm to generate a **Network Key**.
-   **Shamir's Secret Sharing (SSS)**: An algorithm to create a unique line on the _Cartesian coordinate system_.

We will encounter some terminologies when talking about mechanisms and algorithms on the application side:

-   **Factor**: A point on the _Cartesian coordinate system_ where the x-value is the index and the y-value is the **Factor's Key**. All factors must be on a unique straight line called **Factor's Polynomial**.
-   **Key (Factor's Key)**: A number which behaves like a private key.
-   **Factor's Polynomial**: A first degree polynomial which is a unique straight line on the _Cartesian coordinate system_, the intersection point between it and the y-axis is the user **Private Key**.

## 2. Network side

There are also some cryptographic algorithms on the network side:

-   **Proactive Secret Sharing (PSS)**: An algorithm to protect nodes.
-   **Verifiable Secret Sharing (VSS)**: An algorithm to verify the integrity of the **Private Line**.

We are proud to introduce our new cryptographic algorithms on the network side used in the mechanisms:

-   **Interchangeable Secret Sharing (ISS)**: An algorithm to handle dead nodes.
-   **Recoverable Secret Sharing (RSS)**: An algorithm to recover dead nodes.

We will encounter some terminologies when talking about those mechanisms and algorithms on the network side:

-   **Secret**: In the algorithm, whenever user registers, each **Validation Node** will create a key. **Secret** is a point on the y-axis of the _Cartesian coordinate system_ whose y-value is that key.
-   **Share Polynomial**: A second degree polynomial which is a unique parabolic line on the _Cartesian coordinate system_, the intersection point between it and the y-axis is the **Secret**'s Key.
-   **Generated Shares**: **Generated Shares** are the points whose each x-value corresponds to the sequence number of a **Validation Node** (which are $x = 1, 2, 3, 4, 5$), and the y-value is the result of the **Share Polynomial** when substituted by the x-value.
-   **Received Shares**: **Received Shares** are the points which x-values are only one number (the sequence number of a **Validation Node**) and the y-values are the values when substituted that x-value into all the **Share Polynomials** of the **Validation Nodes**.
-   **Share**: An element of the **Generated Shares** or the **Received Shares**, which is a pair of x-value and y-value.
-   **Master Share**: Sum of the **Received Shares** (sum of all **Share** following an x-value).
-   **Master Share Polynomial**: A second degree polynomial which is a unique parabolic line on the _Cartesian coordinate system_ formed by the **Master Shares**.
-   **Network Key**: The y-value of the **Master Share Polynomial** where $x = 0$.

# III. Mechanisms

## 1. Keystore mechanisms (application side)

### 1.1. Theorem 1 - Client Key & Factor definition

When a user registers an account by logging in Arism Wallet with a third-party provider (eg. Google) for the first time, the wallet application (client) will generate randomly a **Client Key**.

$$
\text{key}_{\text{client}} \overset{{\scriptscriptstyle{\text{R}}}}{\leftarrow}\mathbb{G} | \text{client}
$$

This is also considered as the Private Key for user.

$$
pk = \text{key}_{\text{client}}
$$

**Client Factor** is the point located on the y-axis in the _Cartesian coordinate system_ with the height is **Client Key** value.

$$
\textbf{CF} = (0, \text{key}_{\text{client}})
$$

### 1.2. Theorem 2 - Distributed Key Generation (DKG)

Then the **Arism Network** will execute a bunch of advanced algorithms to take care of creating a **Network Key**. This is called **Distributed Key Generation (DKG)** step.

### 1.3. Theorem 3 - Network Key & Factor definition

**Network Key** is the result of **DKG** process on the **Arism Network**.

$$
\text{key}_{\text{network}} \leftarrow \text{DKG} | \text{network}
$$

Combine it with $x = 1$, we have **Network Factor** as a point in the _Cartesian coordinate system_, which is represented as below.

$$
\textbf{NF} = (1, \text{key}_{\text{network}})
$$

### 1.4. Theorem 4 - Shamir's Secret Sharing (SSS)

With those two points, we can establish a unique line (i.e a first degree equation) on the _Cartesian coordinate system_ using _Lagrange interpolation_. This is called **Factor's Polynomial**.

The process of creating the **Factor's Polynomial** is called **Shamir's Secret Sharing (SSS)**.

$$
\textbf{P} \leftarrow \text{SSS}|\text{client}
$$

### 1.5. Theorem 5 - Device Key & Factor definition

Once having the **Factor's Polynomial**, we will get a third key called **Device Key** by retrieving the value of the polynomial where $x = 2$. This **Key** is stored in user's device (browser)

$$
\text{key}_{\text{device}} = \textbf{P}(x = 2)
$$

This pair of values will form a point we will call the **Device Factor**.

$$
\textbf{DF} = (2, \text{key}_{\text{device}})
$$

### 1.6. Theorem 6 - Private Key retrieval technique

Therefore, every time user logs in later, it's just needed to log in on the original device (to get the **Device Key**) with the registered third-party account (to get the **Network Key**).

Then user can recreate the **Factor's Polynomial** by using _Lagrange interpolation_, and get the **Private Key** by intersecting it with the y-axis (where $x = 0$).

$$
pk = \textbf{P}(x = 0)
$$

### 1.7. Theorem 7 - Multi-Factor Authentication (MFA)

User can optionally turn on the **Multi-Factor Authentication (MFA)** feature, this is a recommended feature because if it is turned on, user will be able to log in on a new device, just need the correct password.

### 1.8. Theorem 8 - Recovery Key & Factor definition

Therefore, there is an additional **Key** which is basically the password.

$$
\text{key}_{\text{recovery}} = \textbf{H}(\text{password}) \\
$$

This is called **Recovery Key**, but in order to make a point for **Recovery Factor**, its x-value on the _Cartesian coordinate system_ is needed. We will restore the **Factor's Polynomial** by using **Lagrange interpolation** for the **Private Key** and the **Device Key**.

Then, the x-value will then be the value that when substituted it into the **Factor's Polynomial**, the result will be the **Recovery Key**.

$$
\textbf{RF} = \left(\textbf{P}^{-1}(\text{key}_{\text{recovery}}), \text{key}_{\text{recovery}}\right)
$$

The x-value $\textbf{P}^{-1}(\text{key}_{\text{recovery}})$ will be stored in to the **InterPlanetary File System (IPFS)** for the purpose of combining with the user's password to recreate the **Recovery Factor** when needed. Obviously this doesn't need security because only this x-value alone can't manipulate anything.

### 1.9. Theorem 9 - Private Key retrieval threshold

Overall, whenever user logs in, there is only 2/3 **Factors** needed to be provided: **Network Factor**, **Device Factor** and **Recovery Factor** (if **MFA** is turned on).

## 2. Dead node handling mechanisms (network side)

### 2.1. Theorem 10 - Interchangeable Secret Sharing (ISS)

This is about generating key for user's registration when a **Validation Node** dies.

### 2.1. Theorem 11 - Recoverable Secret Sharing (RSS)

This is about node recovery mechanism after a **Validation Node** dies.

## 3. Integrity preservation mechanism (network side)

### 3.1. Theorem 12 - Proactive Secret Sharing (PSS)

This is about changing all shares when replacing a node.

### 3.2. Theorem 13 - Verifiable Secret Sharing (VSS)

This is about node fidelity validation

# IV. Notes

The nodes only communicate with each other when user registers an account. When logging in, there is no need to communicate with other nodes, therefore dead or malicious nodes are only detected when a user registers an account.

_Cartesian coordinate system_ on application side has only straight lines, while on network side has only parabolic lines. Because on application side, there are 3 factors, while on network side, there are 5 nodes.

# V. Future implementations

-   Integrate **Decentralized Identifier (DID)** and **Verifiable Credential (VC)** into the protocol.
-   Integrate **Account Abstraction (AA)** into the protocol.
-   Multiple private keys support.
-   SDK for developers to integrate the protocol into their applications.
