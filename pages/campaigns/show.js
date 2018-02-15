import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            description: summary[0],
            question: summary[1],
            balance: summary[2],
            requestsCount: summary[3],
            approversCount: summary[4],
            manager: summary[5]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            question,
            description,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                color: 'red',
                header: manager,
                meta: 'Address of Manager',
                description:
                    'The manager created this campaign',
                style: { overflowWrap: 'break-word' }
            },
            {
                                color: 'red',

                header: description,
                meta: question,
                description:
                    'The motive of the poll'
            },
            {
                                color: 'red',

                header: approversCount,
                meta: 'Number of Approvers',
                description:
                    'Number of people who can vote'
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
              <h3>Poll: {this.props.question}</h3>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

                  <Grid.Column width={6}>
                    <ContributeForm address={this.props.address} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                      <a>
                        <Button primary>View and Create Choices</Button>
                      </a>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
