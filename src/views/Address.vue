<template>
    <div class="table-wrapper">
        <el-table class="table-data" :data="tableData" style="width: 100%">
            <el-table-column label="Date" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
            </template>
            </el-table-column>
            <el-table-column label="Name" width="180">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                    <div>name: {{ scope.row.name }}</div>
                    <div>address: {{ scope.row.address }}</div>
                </template>
                <template #reference>
                    <el-tag>{{ scope.row.name }}</el-tag>
                </template>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
                >
                <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
                >
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue'

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style>
    .table-data .table-data{
        background-color: red;
    }

    .table-wrapper {
        background-color: red;
    }

    .el-table__body td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    }

    .el-table__header th {
    font-size: 16px;
    color: #333;
    }

    .el-table__body td:first-child {
    background-color: #f0f0f0;
    font-weight: bold;
    }


    .el-table__body td:nth-child(2) .el-tag {
    background-color: #3399ff;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    }

    .el-table__body td:nth-child(2) .el-popover {
    z-index: 999;
    max-width: 300px;
    }

    .el-table__body td:nth-child(2) .el-popover__title {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
    }

    .el-table__body td:nth-child(2) .el-popover__content {
    font-size: 12px;
    color: #666;
    }

</style>