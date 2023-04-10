# solidity-exercise-react

Code mostly generated with ChatGPT.
The goal is not quality but allow to use the associated smart contract, see https://github.com/LedgerHQ/solidity-exercise

# Frontend

- [x] Connect to wallet: Done with Metamask
- [x] Allow setting the rpc node: Done in Metamask

## Anyone connected

- [x] Show current Boss
- [x] Show participating Characters
- [x] Show total number of players

## Owner connected

- [x] Button to set new Boss
- [x] Button to distribute rewards
- [ ] Button to change owner

## Character connected

- [x] Button to create character
- [x] Show attributes
- [x] Button to fight
- [x] If Boss is dead, disable "fight boss"
- [x] Button to heal with drop down list of characters

## Events

- [x] Show list of contract events: Shows last 100 blocks, and subscribes to new ones
- [x] On Character hit, refresh character details
- [x] On Character healed, refresh character details
- [x] On Character rewarded, refresh character details
- [x] On Character spawned, refresh character details
- [x] On Boss hit, refresh boss details
- [x] On Boss killed, disable "fight boss"
- [x] On Boss spawned, enable "fight boss"
- [x] On Boss killed, enable "set boss"
- [x] On Boss spawned, disable "set boss"