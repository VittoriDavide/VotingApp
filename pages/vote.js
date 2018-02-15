import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import ContributeForm from '../components/ContributeForm';
import { Link } from '../routes';

class VoteShow extends Component {


    onApprove = async (id) => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(id).send({
            from: accounts[0]
        });
    };

    static async getInitialProps(props) {

        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const summary = await campaign.methods.getSummary().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );


        return { requests,
            address: address,
            description: summary[0],
            question: summary[1],
            balance: summary[2],
            requestsCount: summary[3],
            approversCount: summary[4],
            manager: summary[5] };
    }

    renderCards() {

        let items = this.props.requests.map( ( request, index) => {
            return ({
                header: request.description,
                description: request.name,
                extra: (
                    <Button
                        icon="hand rock"
                        positive
                        color='green'
                        onClick={() => this.onApprove(index)}
                    >
                        Approve
                    </Button>
                )
            });
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show: {this.props.question}</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
                    </Grid.Row>

                </Grid>
            </Layout>
        );
    }
}

export default VoteShow;
