import React, { Component } from 'react';
import { backendFetch } from '../../util/fetch';

import './styles.scss';
import PageHeader from '../PageHeader';
import MovementStatus from '../MovementStatus';
import Modal from '../Modal';

class Movement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
    };

    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  async fetchData() {
    const resp = await backendFetch('/api/group/statuses');
    const body = await resp.json();
    const { data } = body;
    if (!data) {
      this.setState({ error: `Error fetching movement data: ${JSON.stringify(body, null, 2)}` });
      return;
    }
    this.setState({ data });
  }

  render() {
    const { data, error } = this.state;
    return (
      <div className="movement">
        <PageHeader title="Movement" subtitle="Finding someone? Look here!" />
        {
          error !== null ? (
            <Modal onClose={() => this.setState({ error: null })}>
              <span>{error}</span>
            </Modal>
          ) : null
        }
        {
          data.map((group) => (
            <div className="movement__group">
              <span className="movement__group__name">{group.group_name}</span>
              {
                group.statuses.map((status) => (
                  <MovementStatus key={`${status.title}-${status.user.name}`} status={status} />
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default Movement;
