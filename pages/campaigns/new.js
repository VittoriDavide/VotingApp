import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        title: '',
        errorMessage: '',
        question: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.title, this.state.question)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
              <h3>Create a Campaign For Voting</h3>

              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Title </label>
                  <Input
                      label="Title"
                      labelPosition="right"
                      value={this.state.title}
                      onChange={event =>
                          this.setState({ title: event.target.value })}
                  />
                  <label>Question </label>
                  <Input
                      label="Please Insert Question"
                      labelPosition="right"
                      value={this.state.question}
                      onChange={event =>
                          this.setState({ question: event.target.value })}
                  />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>
                  Create!
                </Button>
              </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
