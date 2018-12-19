workflow "Main" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "install"
}

action "Lint" {
  needs = "Install"
  uses = "docker://culturehq/actions-yarn:latest"
  args = "lint"
}

action "Test" {
  needs = "Install"
  uses = "docker://culturehq/actions-yarn:latest"
  args = "test"
}
