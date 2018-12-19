workflow "Main" {
  on = "push"
  resolves = "Publish Filter"
}

action "Install" {
  uses = "CultureHQ/actions-yarn@master"
  args = "install"
}

action "Lint" {
  needs = "Install"
  uses = "CultureHQ/actions-yarn@master"
  args = "lint"
}

action "Test" {
  needs = "Install"
  uses = "CultureHQ/actions-yarn@master"
  args = "test"
}

action "Publish Filter" {
  needs = ["Lint", "Test"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}
