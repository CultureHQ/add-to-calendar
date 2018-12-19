workflow "Main" {
  on = "push"
  resolves = ["Lint", "Test"]
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
