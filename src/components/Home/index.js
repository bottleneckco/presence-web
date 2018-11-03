import React, { Component } from 'react';

import './styles.scss';
import userPropType from '../../prop-types/user';
import PageHeader from '../PageHeader';
import Status from '../Status';
import Modal from '../Modal';
import SimpleStatusForm from '../modal-forms/SimpleStatusForm';
import fetch from '../../util/fetch';

const STATUSES_SIMPLE = ['Lesson', 'Meeting', 'Roll call', 'In Office'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModalStatus: null,
      latestStatus: null,
      error: null,
    };
    this.getSinceTime = this.getSinceTime.bind(this);
    this.handleStatusClick = this.handleStatusClick.bind(this);
    this.submitStatus = async ({ status, text }) => {
      const resp = await fetch(`${process.env.BACKEND_ROOT_URL}/api/status`, {
        method: 'POST',
        body: JSON.stringify({
          title: status,
          notes: text,
          start_time: new Date(),
        }),
      });
      this.setState({ currentModalStatus: null });
      if (!resp.ok) {
        this.setState({ error: `Error submitting payload: ${await resp.json()}` });
      }
    };
  }

  getSinceTime(name) {
    const { latestStatus } = this.state;
    if (latestStatus === null || latestStatus.name !== name) return null;
    return latestStatus.start_time;
  }

  handleStatusClick(status) {
    this.setState({ currentModalStatus: status });
  }

  render() {
    const { currentModalStatus, error } = this.state;
    return (
      <div className="home">
        <PageHeader title="Make a Status Update" subtitle="Heading somewhere? Pick your most relevant status." />
        {
          error !== null ? (
            <Modal onClose={() => this.setState({ error: null })}>
              <span>{error}</span>
            </Modal>
          ) : null
        }
        <div className="home__statuses">
          {
            STATUSES_SIMPLE.map((status) => (
              <Status
                title={status}
                sinceTime={this.getSinceTime(status)}
                handleClick={() => this.handleStatusClick(status)}
              >
                <Modal
                  show={currentModalStatus === status}
                  onClose={() => this.setState({ currentModalStatus: null })}
                >
                  <SimpleStatusForm status={status} submit={this.submitStatus} />
                </Modal>
              </Status>))
          }
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  user: null,
};

Home.propTypes = {
  user: userPropType,
};


export default Home;
