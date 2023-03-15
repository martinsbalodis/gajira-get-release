const { get } = require('lodash')

const serviceName = 'jira'
const { format } = require('url')
const client = require('./client')(serviceName)

class Jira {
  constructor ({ baseUrl, token, email }) {
    this.baseUrl = baseUrl
    this.token = token
    this.email = email
  }

  async getVersion(argv) {

    const versionResult = await this.fetch('getVersion', {
      pathname: `/rest/api/2/project/${argv.projectKey}/version`,
      query: {
        status: argv.status,
        query: argv.prefix,
        maxResults: 100,
        orderBy: argv.order === 'asc' ? '+sequence' : '-sequence'
      }
    }, {
      method: 'GET',
    })

    if (versionResult.total === 0) {
      throw new Error('Unreleased Jira version not found');
    }

    const sorted = versionResult.values.sort(
        (objA, objB) => argv.order === 'asc' ? objA.id - objB.id : objB.id - objA.id,
    );

    sorted[0].nameWithoutPrefix = sorted[0].name.replace(argv.prefix, '').trim();

    return sorted[0];
  }

  async fetch (apiMethodName,
    { host, pathname, query },
    { method, body, headers = {} } = {}) {
    const url = format({
      host: host || this.baseUrl,
      pathname,
      query,
    })

    if (!method) {
      method = 'GET'
    }

    if (headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json'
    }

    if (headers.Authorization === undefined) {
      headers.Authorization = `Basic ${Buffer.from(`${this.email}:${this.token}`).toString('base64')}`
    }

    // strong check for undefined
    // cause body variable can be 'false' boolean value
    if (body && headers['Content-Type'] === 'application/json') {
      body = JSON.stringify(body)
    }

    const state = {
      req: {
        method,
        headers,
        body,
        url,
      },
    }

    try {
      await client(state, `${serviceName}:${apiMethodName}`)
    } catch (error) {
      const fields = {
        originError: error,
        source: 'jira',
      }

      delete state.req.headers

      throw Object.assign(
        new Error('Jira API error'),
        state,
        fields
      )
    }

    return state.res.body
  }
}

module.exports = Jira
