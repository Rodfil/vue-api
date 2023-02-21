<template>
  <div>
    <el-button type="success" @click="showModal = true" >Add Warehouse</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="WarehouseName" width="180">
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
      
      <el-table-column label="WarehouseCode" width="180">
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
    <el-dialog title="Add Warehouse" :visible.sync="showModal">
        <!-- your form or input fields for adding a new warehouse here -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="showModal = false">Cancel</el-button>
          <el-button type="primary" @click="addWarehouse">Add</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script lang="ts" >
import { Timer } from '@element-plus/icons-vue'

export default{
  data() {
    return {
      tableData: [],
      showModal: false,
    };
  },
  methods: {
    addWarehouse() {
      this.showModal = false;
    },

    handleEdit(index, row) {

    },
    handleDelete(index, row) {
      
    },
 },
}
</script>

<style>
  .el-popover__popper {
    z-index: 9999;
  }
</style>