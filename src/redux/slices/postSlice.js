import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "../../services/post.service";

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (_, { rejectWithValue }) => {

    try {
        const data = await postService.getAllPosts()
        if (data.name === 'AxiosError') {
            return rejectWithValue(data)
        }
        return data
    } catch (err) {
        console.error(err);
    }

})
export const fetchAllTags = createAsyncThunk('posts/fetchAllTags', async (_, { rejectWithValue }) => {
    try {
        const data = await postService.getAllTags()
        if (data.name === 'AxiosError') {
            return rejectWithValue(data)
        }
        return data
    } catch (err) {
        console.error(err);
    }
})
export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (params) => {
    const data = await postService.getUserPosts(params)
    return data
})

const initialState = {
    posts: {
        items: [],
        loading: 'loading',
        errors: null,
        userPosts: []
    },
    tags: {
        items: [],
        loading: 'loading',
        errors: null
    }

}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.posts.items = []
                state.posts.loading = 'loading'
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.posts.loading = 'loaded'
                state.posts.items = action.payload
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.posts.items = []
                state.posts.loading = 'rejected'
                state.posts.errors = action.payload
            })
            .addCase(fetchAllTags.pending, (state) => {
                state.tags.items = []
                state.tags.loading = 'loading'
            })
            .addCase(fetchAllTags.fulfilled, (state, action) => {
                state.tags.loading = 'loaded'
                state.tags.items = action.payload
            })
            .addCase(fetchAllTags.rejected, (state, action) => {
                state.tags.items = []
                state.tags.loading = 'rejected'
                state.tags.errors = action.payload
            })
            .addCase(fetchUserPosts.pending, (state) => {
                state.posts.userPosts = []
                state.posts.loading = 'loading'
            }).addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.posts.loading = 'loaded'
                state.posts.userPosts = action.payload
            }).addCase(fetchUserPosts.rejected, (state, action) => {
                state.posts.userPosts = []
                state.posts.loading = 'rejected'
                state.tags.errors = action.payload
            })
    },
})

export default postSlice.reducer;