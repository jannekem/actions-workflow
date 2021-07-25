const events = [
  "push",
  "pull_request",
  "pull_request_review",
  "pull_request_review_comment",
  "pull_request_target",
  "registry_package",
  "release",
  "status",
  "watch",
  "workflow_run",
  "schedule",
  "check_run",
  "check_suite",
  "create",
  "delete",
  "deployment",
  "deployment_status",
  "discussion",
  "discussion_comment",
  "fork",
  "gollum",
  "issues",
  "issue_comment",
  "label",
  "milestone",
  "page_build",
  "project",
  "project_card",
  "project_column",
  "public",
  "schedule",
];

const activityTypes = {
  check_run: ["created", "requested", "completed"],
  check_suite: ["completed", "requested", "rerequested"],
  discussion: [
    "opened",
    "edited",
    "deleted",
    "transferred",
    "pinned",
    "unpinned",
    "labeled",
    "unlabeled",
    "locked",
    "unlocked",
    "category_changed",
    "answered",
    "unanswered",
  ],
  discussion_comment: ["created", "edited", "deleted"],
  issue_comment: ["created", "edited", "deleted"],
  issues: [
    "opened",
    "edited",
    "deleted",
    "transferred",
    "pinned",
    "unpinned",
    "closed",
    "reopened",
    "assigned",
    "unassigned",
    "labeled",
    "unlabeled",
    "locked",
    "unlocked",
    "milestoned",
    "demilestoned",
  ],
  label: ["created", "edited", "deleted"],
  milestone: ["created", "closed", "opened", "edited", "deleted"],
  project: ["created", "updated", "closed", "reopened", "edited", "deleted"],
  project_card: ["created", "moved", "converted", "edited", "deleted"],
  project_column: ["created", "updated", "moved", "deleted"],
  pull_request: [
    "assigned",
    "unassigned",
    "labeled",
    "unlabeled",
    "opened",
    "edited",
    "closed",
    "reopened",
    "synchronize",
    "converted_to_draft",
    "ready_for_review",
    "locked",
    "unlocked",
    "review_requested",
    "review_request_removed",
    "auto_merge_enabled",
    "auto_merge_disabled",
  ],
  pull_request_review: ["submitted", "edited", "dismissed"],
  pull_request_review_comment: ["created", "edited", "deleted"],
  pull_request_target: [
    "assigned",
    "unassigned",
    "labeled",
    "unlabeled",
    "opened",
    "edited",
    "closed",
    "reopened",
    "synchronize",
    "converted_to_draft",
    "ready_for_review",
    "locked",
    "unlocked",
    "review_requested",
    "review_request_removed",
    "auto_merge_enabled",
    "auto_merge_disabled",
  ],
  registry_package: ["published", "updated"],
  release: [
    "published",
    "unpublished",
    "created",
    "edited",
    "deleted",
    "prereleased",
    "released",
  ],
  watch: ["started"],
  workflow_run: ["completed", "requested"],
};

export { events, activityTypes };
