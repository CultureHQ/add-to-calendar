workflow "Main" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Lint" {
  uses = "CultureHQ/actions-yarn@master"
  runs = "yarn install && yarn lint"
}

action "Test" {
  uses = "CultureHQ/actions-yarn@master"
  runs = "yarn install && yarn test"
}
