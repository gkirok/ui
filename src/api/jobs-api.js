import { mainHttpClient } from '../httpClient'

export default {
  abortJob: (project, jobId, iter) => {
    const params = {}

    if (!isNaN(iter)) {
      params.iter = iter
    }

    return mainHttpClient.patch(
      `/run/${project}/${jobId}`,
      {
        'status.state': 'aborted'
      },
      { params }
    )
  },
  editJob: (postData, project) =>
    mainHttpClient.put(
      `/projects/${project}/schedules/${postData.scheduled_object.task.metadata.name}`,
      postData
    ),
  getAllJobs: (project, filters) => {
    const params = {
      project
    }

    if (filters?.labels) {
      params.label = filters.labels.split(',')
    }

    if (filters?.name) {
      params.name = `~${filters.name}`
    }

    if (filters?.state) {
      params.state = filters.state
    }

    if (filters?.dates) {
      if (filters.dates[0]) {
        params.start_time_from = filters.dates[0].toISOString()
      }

      if (filters.dates[1]) {
        params.start_time_to = filters.dates[1].toISOString()
      }
    }

    return mainHttpClient.get('/runs', { params })
  },
  getJobFunction: (project, functionName, hash) =>
    mainHttpClient.get(`/func/${project}/${functionName}?hash_key=${hash}`),
  getJobLogs: (id, project) => mainHttpClient.get(`/log/${project}/${id}`),
  getScheduledJobs: (project, status, filters) => {
    const params = {
      include_last_run: 'yes'
    }

    if (filters?.owner) {
      params.owner = filters.owner
    }

    if (filters?.name) {
      params.name = `~${filters.name}`
    }

    if (filters?.labels) {
      params.labels = filters.labels?.split(',')
    }

    return mainHttpClient.get(`/projects/${project}/schedules`, { params })
  },
  removeScheduledJob: (project, scheduleName) =>
    mainHttpClient.delete(`/projects/${project}/schedules/${scheduleName}`),
  runJob: postData => mainHttpClient.post('/submit_job', postData),
  runScheduledJob: (postData, project, job) =>
    mainHttpClient.post(
      `/projects/${project}/schedules/${job}/invoke`,
      postData
    )
}
