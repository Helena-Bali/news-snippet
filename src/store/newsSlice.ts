import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {IData_SnippetNews} from '../interfaces'
import {getNews} from '../api/index'


interface NewsState {
    news: IData_SnippetNews;
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    news: {
        ID: 0,
        TI: "",
        AB: "",
        URL: "",
        DOM: "",
        DP: "",
        LANG: "",
        REACH: 0,
        KW: [],
        AU: [],
        CNTR: "",
        CNTR_CODE: "",
        SENT: "",
        TRAFFIC: [],
        FAV: "",
        HIGHLIGHTS: []
    },
    loading: false,
    error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
    return await getNews()
});

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка загрузки";
            });
    },
});

export default newsSlice.reducer;
