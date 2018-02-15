import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: '',
        name: ''
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const {name,  description } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(name, description)
                .send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>Back</a>
              </Link>
              <h3>Create a Choice</h3>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Name of Choice</label>
                  <Input
                      value={this.state.name}
                      onChange={event =>
                          this.setState({ name: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <Input
                      value={this.state.description}
                      onChange={event =>
                          this.setState({ description: event.target.value })}
                  />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                  Create!
                </Button>
              </Form>
            </Layout>
        );
    }
}

export default RequestNew;
