<template>
    <div>
        <h1>Furniture</h1>
        <table class="table w-50">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in furniture">
                    <th scope="row">{{ record.id }}</th>
                    <td>{{ record.name }}</td>
                    <td>{{ record.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Index",
    data() {
        return {
            furniture: null,
        };
    },
    methods: {
        getFurniture() {
            axios.get("/api/furniture").then((res) => {
                this.furniture = res.data.data;
            });
        },
    },
    mounted() {
        this.getFurniture();
    },
};
</script>

<style lang="scss" scoped></style>
