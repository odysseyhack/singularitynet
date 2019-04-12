# SingularityNET Odyssey Nature 2.0 entry

## Overview
We are building a system that a community (local government, club, commons, etc) can use to define good behaviors, track user behavior, identify people who enact good behaviors to possibly reward them, verify the effects of enacting such behavior for the community. The system aims to be generic enough that you can use it to track different problems: resource consumption, social behavior, political action, education policies, etc.

For the purposes of this hackaton, we are building a system that tracks gas consumption in a population and identifies households that consume less gas than average for their household type with the goal of rewarding such households within the community (with things such as tax credits, or free public transportation, etc).

## Components
- Smart meters that upload the hashed and timestamped gas consumption readings for a household
- Oracle, implemented as a SingularityNET service, to retrieve the gas consumption readings for each household, behavior data for identities in the community and public information about the community itself (example: carbon footprint of the community)
- Database of households (identity -> household type), hashed and timestamped at regular intervals
- A smart contract on a public blockchain with the latest timestamped hash of the households data
- AI service that confronts the readings with its own trained model to determine whether a household is enacting good behavior; the output (household, reward, input data, confidence) should be hashed and timestamped for auditing purposes
- Pluggable reward system that defines the ruleset and distributes incentives for each identity
