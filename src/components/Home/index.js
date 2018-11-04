import React, { Component } from 'react';

import './styles.scss';
import userPropType from '../../prop-types/user';
import PageHeader from '../PageHeader';
import Status from '../Status';
import Modal from '../Modal';
import SimpleStatusForm from '../modal-forms/SimpleStatusForm';
import { backendFetch } from '../../util/fetch';
import ComplicatedStatusForm from '../modal-forms/ComplicatedStatusForm';

const STATUSES_SIMPLE = ['Lesson', 'Meeting', 'Roll call', 'In Office'];
const STATUSES_COMPLICATED = [{ title: 'Off In Lieu', titleLocked: true }, { title: 'Course' }, { title: 'Out Base' }];

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
    this.fetchLatestStatus = this.fetchLatestStatus.bind(this);
    this.submitStatus = async ({ status, text }) => {
      const resp = await backendFetch('/api/status', {
        method: 'POST',
        body: JSON.stringify({
          title: status,
          notes: text,
          start_time: new Date(),
        }),
      });
      this.setState({ currentModalStatus: null });
      if (!resp.ok) {
        this.setState({ error: `Error submitting payload: ${JSON.stringify(await resp.json(), null, 2)}` });
      }
      this.fetchLatestStatus();
    };
    this.fetchLatestStatus();
  }

  getSinceTime(name) {
    const { latestStatus } = this.state;
    if (latestStatus === null || latestStatus.title !== name) return null;
    return latestStatus.start_time;
  }

  async fetchLatestStatus() {
    const resp = await backendFetch('/api/status/latest');
    if (resp.ok) {
      const { data } = await resp.json();
      this.setState({ latestStatus: data });
    }
  }

  handleStatusClick(status) {
    this.setState({ currentModalStatus: status });
  }

  render() {
    const { currentModalStatus, latestStatus, error } = this.state;
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
                current={latestStatus && status === latestStatus.title}
              >
                <Modal
                  show={currentModalStatus === status}
                  onClose={() => this.setState({ currentModalStatus: null })}
                >
                  <SimpleStatusForm status={status} submit={this.submitStatus} />
                </Modal>
              </Status>))
          }
          {
            STATUSES_COMPLICATED.map(({ title, titleLocked }) => (
              <Status
                title={title}
                sinceTime={this.getSinceTime(title)}
                handleClick={() => this.handleStatusClick(title)}
                current={latestStatus && title === latestStatus.title}
              >
                <Modal
                  show={currentModalStatus === title}
                  onClose={() => this.setState({ currentModalStatus: null })}
                >
                  <ComplicatedStatusForm
                    status={title}
                    submit={this.submitStatus}
                    titleLocked={titleLocked}
                  />
                </Modal>
              </Status>
            ))
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
