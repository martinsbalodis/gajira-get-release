const Action = require('../action')

const auth = { email: process.env.JIRA_USER_EMAIL, token: process.env.JIRA_API_TOKEN }
const baseUrl = process.env.JIRA_BASE_URL
const config = {
	...auth,
	baseUrl,
}

test(`Should get newest unreleased release`, async () => {
	const action = new Action({
		argv: {
			projectKey: "TEST",
			prefix: "Cloud",
			status: "unreleased",
			order: "desc"
		},
		config,
	})

	const version = await action.execute();

	expect(version.name).toBe('Cloud 1.3.0');
	expect(version.nameWithoutPrefix).toBe('1.3.0');
})

test(`Should get oldest unreleased release`, async () => {
	const action = new Action({
		argv: {
			projectKey: "TEST",
			prefix: "Cloud",
			status: "unreleased",
			order: "asc"
		},
		config,
	})

	const version = await action.execute();

	expect(version.name).toBe('Cloud 1.2.0');
	expect(version.nameWithoutPrefix).toBe('1.2.0');
})
