import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        var results = await Promise.all(campaigns.map(async (address) => {
            let campaign = Campaign(address);
            const summary = await campaign.methods.getSummary().call();

            return {
                address: address,
                description: summary[0],
                question: summary[1],
                balance: summary[2],
                requestsCount: summary[3],
                approversCount: summary[4],
                manager: summary[5]
            };
        }));


        return { results };
    }

    renderCampaigns() {
        const items = this.props.results.map(({description, address, question}) => {
            return {
                header: description + ": " + question,
                description: (
                        <React.Fragment>
                        <Link route={`/campaigns/${address}`}>

                            <a>View poll</a>
                        </Link>
                     <Link route={`/${address}`}>
                            <Button
                                floated="right"
                                content="Vote"
                                icon="hand pointer"
                                positive
                            />
                        </Link>
                        </React.Fragment>
                ),
                fluid: true,
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        console.log(this.props.results);
        return (
            <Layout>
                <div>
                    <h3>Open Polls</h3>

                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                floated="right"
                                content="Create Poll"
                                icon="hand spock"
                                primary
                            />
                        </a>
                    </Link>

                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;
