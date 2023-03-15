const fs = require('fs')
const YAML = require('yaml')
const core = require('@actions/core')

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
    }).execute()

    core.setOutput('version', result)
  } catch (error) {
    core.setFailed(error.toString())
  }
}

function parseArgs () {

  const projectKey = core.getInput('projectKey')
  const prefix = core.getInput('prefix')
  const status = core.getInput('status')
  const order = core.getInput('order')

  if (!projectKey || !prefix || !status || !order) {
    throw new Error('Jira getVersion required attributes: projectKey, prefix, status, order');
  }

  return {
    projectKey,
    prefix,
    status,
    order,
  }
}

exec()
