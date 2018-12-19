workflow "Main" {
  on = "push"
  resolves = "Publish Filter"
}

action "Install" {
  uses = "CultureHQ/actions-yarn@master"
  runs = "install"
}

action "Lint" {
  needs = "Install"
  uses = "CultureHQ/actions-yarn@master"
  runs = "lint"
}

action "Test" {
  needs = "Install"
  uses = "CultureHQ/actions-yarn@master"
  runs = "test"
}

action "Publish Filter" {
  needs = ["Lint", "Test"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}
