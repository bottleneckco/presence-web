import React, { Component } from 'react';

import './styles.scss';
import userPropType from '../../prop-types/user';
import PageHeader from '../PageHeader';
import Status from '../Status';
import Modal from '../Modal';
import SimpleStatusForm from '../modal-forms/SimpleStatusForm';
import { backendFetch } from '../../util/fetch';
import ComplicatedStatusForm from '../modal-forms/ComplicatedStatusForm';
import MedicalStatusForm from '../modal-forms/MedicalStatusForm';
import LeaveStatusForm from '../modal-forms/LeaveStatusForm';

import lessonIcon from '../../images/book-open-page-variant.svg';
import meetingIcon from '../../images/door-closed.svg';
import rollCallIcon from '../../images/human-male.svg';
import inOfficeIcon from '../../images/desktop-classic.svg';
import leaveIcon from '../../images/account-off-outline.svg';
import courseIcon from '../../images/library-books.svg';
import outBaseIcon from '../../images/exit-run.svg';
import otherIcon from '../../images/help-circle.svg';
import medicalIcon from '../../images/medical-bag.svg';

const STATUSES_SIMPLE = [
  { title: 'Lesson', icon: lessonIcon },
  { title: 'Meeting', icon: meetingIcon },
  { title: 'Roll call', icon: rollCallIcon },
  { title: 'In Office', icon: inOfficeIcon },
];
const STATUSES_COMPLICATED = [
  { title: 'Off In Lieu', titleLocked: true, icon: leaveIcon },
  { title: 'Course', icon: courseIcon },
  { title: 'Out Base', icon: outBaseIcon },
  { title: 'Others', icon: otherIcon },
];

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
    this.submitStatus = async (payload) => {
      const resp = await backendFetch('/api/status', {
        method: 'POST',
        body: JSON.stringify(Object.assign({
          start_time: new Date(),
        }, payload)),
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
    if (latestStatus === null || !latestStatus.title.startsWith(name)) return null;
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
            STATUSES_SIMPLE.map(({ title, icon }) => (
              <Status
                title={title}
                sinceTime={this.getSinceTime(title)}
                handleClick={() => this.handleStatusClick(title)}
                current={latestStatus && title === latestStatus.category}
                icon={icon}
              >
                <Modal
                  show={currentModalStatus === title}
                  onClose={() => this.setState({ currentModalStatus: null })}
                >
                  <SimpleStatusForm status={title} submit={this.submitStatus} />
                </Modal>
              </Status>))
          }
          <Status
            title="Leave"
            sinceTime={this.getSinceTime('Leave')}
            handleClick={() => this.handleStatusClick('Leave')}
            current={latestStatus && latestStatus.title.startsWith('Leave')}
            icon={leaveIcon}
          >
            <Modal
              show={currentModalStatus && currentModalStatus.startsWith('Leave')}
              onClose={() => this.setState({ currentModalStatus: null })}
            >
              <LeaveStatusForm submit={this.submitStatus} />
            </Modal>
          </Status>
          {
            STATUSES_COMPLICATED.map(({ title, titleLocked, icon }) => (
              <Status
                title={title}
                sinceTime={this.getSinceTime(title)}
                handleClick={() => this.handleStatusClick(title)}
                current={latestStatus && title === latestStatus.category}
                icon={icon}
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
          <Status
            title={`Medical ${latestStatus && latestStatus.category === 'Medical' ? latestStatus.title : ''}`}
            sinceTime={this.getSinceTime('Medical')}
            handleClick={() => this.handleStatusClick('Medical')}
            current={latestStatus && latestStatus.title.startsWith('Medical')}
            icon={medicalIcon}
          >
            <Modal
              show={currentModalStatus && currentModalStatus.startsWith('Medical')}
              onClose={() => this.setState({ currentModalStatus: null })}
            >
              <MedicalStatusForm submit={this.submitStatus} />
            </Modal>
          </Status>
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
