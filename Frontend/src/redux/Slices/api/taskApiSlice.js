import { apiSlice } from "../apiSlice";

const TASKS_URL = "/tasks";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    getAllTask: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Task'],
    }),

    getSingleTask: builder.query({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    createSubTask: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TASKS_URL}/create-subtask/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    postTaskActivity: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TASKS_URL}/activity/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    trashTast: builder.mutation({
      query: ({ id }) => ({
        url: `${TASKS_URL}/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ['Task'],
    }),

    deleteRestoreTast: builder.mutation({
      query: ({ id, actionType }) => ({
        url: `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Task'],
    }),

    getDasboardStats: builder.query({
      query: () => ({
        url: `${TASKS_URL}/dashboard`,
        method: "GET",
      }),
      invalidatesTags: ['Task'],
    }),

    changeTaskStage: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/change-stage/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),

    changeSubTaskStatus: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/change-status/${data?.id}/${data?.subId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  usePostTaskActivityMutation,
  useCreateTaskMutation,
  useGetAllTaskQuery,
  useCreateSubTaskMutation,
  useTrashTastMutation,
  useDeleteRestoreTastMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useGetSingleTaskQuery,
  useGetDasboardStatsQuery,
  useChangeTaskStageMutation,
  useChangeSubTaskStatusMutation,
} = postApiSlice;