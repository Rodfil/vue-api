<template>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Street" width="180">
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

    <el-table-column label="City" width="180">
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

    <el-table-column label="State" width="180">
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

    <el-table-column label="PostalCode" width="180">
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

    <el-table-column label="Country" width="180">
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

    <el-table-column label="Actions">
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