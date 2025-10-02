export const team = {
  NameOfTeamBeingReviewed: {
    required: true,
    _value: ''
  },
  applicationName: {
    required: true,
    _value: ''
  },
  repoUrl: {
    required: true,
    _value: ''
  },
  branch: {
    required: true,
    _value: ''
  },
  sonarQubeRepository: {
    required: false,
    _value: ''
  },
  hpFortifyDashboard: {
    required: false,
    _value: ''
  },
  nexusIqDashboard: {
    required: false,
    _value: ''
  },
  reviewers: {
    required: true,
    _value: [] as string[],
  },
  date: {
    required: true,
    _value: new Date(),
  },
};
