workflow "Main" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Lint" {
  uses = "./.github/lint"
}

action "Test" {
  uses = "./.github/test"
}
