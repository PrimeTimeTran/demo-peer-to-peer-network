# Nuxt Blockchain
Create a blockchain app.

## Step 1
Get the ball running with some initial behavior.

### Requirements

- [ ] Create a user
- [ ] Check the balance of an user
- [ ] Transfer amount from one user to another
- [ ] Check all balances in the blockchain

### Problems

- Authentication
  - Anyone can do anything
  - Fixed with passwords
- Availability/reliability
  - Everything in memory
  - Single point of failure. I stop server, we're wiped out.
  - Server goes down...
  - Government shuts down server...
  - Currency dies...
- Security
  - If anyone gets root access they can do anything

## Step 2
Add a decentralized architecture.
Use gossip protocol as proof of concept that we can propagate changes through a network of peers.
Version updates in order to reconcile conflicts when a peer on the network receives multiple updates to the same port/peer/block.