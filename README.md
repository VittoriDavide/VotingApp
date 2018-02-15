# VotingApp
This is the Voting app platform


To start the project:

To install dependencies:

npm install --save


To start the project:

npm start

or

yarn start



The Voting App Project, is created with React and Next.js

In the folder ethereum we have the contracts that are written in solidity:
Campaign -> Polls
CampaignFactory -> PollsFactory

Vote (TODO implement it on front end) -> Citizen Token

on the ethereum folder we have the compiler

node compile.js

to compile our solidity using solc, and generates the contracts build on the build folder

To deploy the Contracts we have

node deploy.js

The Project is structured in pages

The landing Page were we put all the polls to wich peoplo can vote

The Voting page were people can select the choices

The view poll button of the first page bring us to a page where we can see description of the poll and invite voters to our
poll.

We can add Choices to the poll.




