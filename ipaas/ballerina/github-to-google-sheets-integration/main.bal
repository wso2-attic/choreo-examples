import ballerina/io;
import ballerinax/github;
import ballerinax/googleapis.sheets as sheets;

configurable string GITHUB_PAT = ?;
configurable string GITHUB_USERNAME = ?;
configurable string GITHUB_REPO_NAME = ?;

configurable string GOOGLE_CLIENT_ID = ?;
configurable string GOOGLE_CLIENT_SECRET = ?;
configurable string REFRESH_TOKEN = ?;
configurable string GOOGLE_SHEET_ID = ?;

const DEFAULT_SHEET_NAME = "Sheet1";

github:ConnectionConfig githubConfigs = {
    auth: {
        token: GITHUB_PAT
    }
};
sheets:ConnectionConfig spreadsheetConfig = {
    auth: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshUrl: sheets:REFRESH_URL,
        refreshToken: REFRESH_TOKEN
    }
};

// initiate google sheet client
sheets:Client spreadsheetClient = check new (spreadsheetConfig);

// initiate github client
github:Client githubClient = check new (githubConfigs);

public function main() returns error?|error {
    io:println("Fetching Data From Github");

    // fetching repository of the user
    github:Repository repo = check githubClient->getRepository(GITHUB_USERNAME, GITHUB_REPO_NAME);
    RepoData repoData = {name: repo.name, repo: repo, prs: [], issues: []};
    do {
        // fetch issues and pull requests of each repository 
        stream<github:PullRequest, github:Error?> PRs = check githubClient->getPullRequests(GITHUB_USERNAME, repo.name, github:PULL_REQUEST_OPEN);
        stream<github:Issue, github:Error?> issues = check githubClient->getIssues(GITHUB_USERNAME, repo.name);

        // convert streams to arrays
        repoData.prs = check convertPullRequestStreamToArray(PRs);
        repoData.issues = check convertIssueStreamToArray(issues);

    } on fail var e {
        io:println("Error occurred while fetching data for repository: ", repo.name, " ", e.message());
    }

    io:println("Fetched data from Github");

    io:println("Writing to the Google Sheet");

    // add overviwe sheet
    do {
        check spreadsheetClient->renameSheet(GOOGLE_SHEET_ID, DEFAULT_SHEET_NAME, GITHUB_REPO_NAME);
    } on fail var e {
        io:println("Error occurred while renaming the default sheet: ", e.message());
    }

    // process data and write to the google sheet
    createRepoSheet(repoData);

    io:println("Wrote data to the Google Sheet");
}
