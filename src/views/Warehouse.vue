<template>
  <!-- Form -->
    <el-button type="success"  @click="dialogFormVisible = true">Add Warehouse</el-button>
     <el-dialog v-model="dialogFormVisible" title="Warehouse">
        <el-form :model="form">
          <el-form-item label="Warehouse Name" :label-width="formLabelWidth">
            <el-input v-model="form.warehouseName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Warehouse Code" :label-width="formLabelWidth">
            <el-input v-model="form.warehouseCode" autocomplete="off" />
          </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">  
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="form.warehouseId ? updateWarehouse() : addWarehouse()">
                {{ form.warehouseId ? 'Update' : 'Add' }}
            </el-button>
          </span>
        </template>
      </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Warehouse Name" width="180" prop="warehouseName">

          </el-table-column>
          <el-table-column label="Warehouse Code" width="180" prop="warehouseCode">
            
          </el-table-column>
          <el-table-column label="Actions">
            <template #default="scope">
              <el-button size="small" @click="editWarehouse(scope.row)">Edit</el-button>
              <el-button size="small" type="danger" @click="deleteWarehouse(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
      </el-table>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
  data() {
    return {
      form: {
        warehouseId: null,  
        warehouseName: '',
        warehouseCode: ''
      },
      dialogFormVisible: false,
      tableData: [],
    };
  },
  methods: {
    addWarehouse() {
        axios.post('https://localhost:7040/api/Warehouse', {
        warehouseName: this.form.warehouseName,
        warehouseCode: this.form.warehouseCode
      })
        .then(response => {
          console.log(response.data)
          this.dialogFormVisible = false;
          this.loadTableData();

          Swal.fire({
            icon: 'sucess',
            title: 'Warehouse Added Successfully',
            showConfirmButton: false,
            timer: 1000
          })
            this.form = {
              warehouseId: null,
              warehouseName: '',
              warehouseCode: '',    
          };
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTableData() {
      axios.get('https://localhost:7040/api/Warehouse')
        .then(response => {
          this.tableData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteWarehouse(row) {
      Swal.fire({
        title: 'Are you sure you want to delete this?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if(result.isConfirmed) {
         /*  console.log(row);  ->>> Check for row if its exist*/ 
          axios.delete(`https://localhost:7040/api/Warehouse/${row.warehouseId}`)
            .then(response => {
              console.log(response.data);
              this.loadTableData();
            })
            .catch(error => {
                console.log(error);
            });
            Swal.fire({
              icon: 'success',
              title: 'Warehouse has been deleted!'
            }) 
        }
      })
    },
    editWarehouse(row) {
      this.form.warehouseId = row.warehouseId;
      this.form.warehouseName = row.warehouseName;
      this.form.warehouseCode = row.warehouseCode;

      this.dialogFormVisible = true;  
    },
    updateWarehouse() {
      axios.put(`https://localhost:7040/api/Warehouse/${this.form.warehouseId}`, {
        warehouseName: this.form.warehouseName,
        warehouseCode: this.form.warehouseCode,
        warehouseId: this.form.warehouseId
      })
      .then(response => {
        console.log(response.data)
        this.dialogFormVisible = false;
        this.loadTableData();

        Swal.fire({
          icon: 'success',
          title: 'Warehouse updated successfully',
          showConfirmButton: false,
          timer: 1000
        });
        this.form = {
            warehouseId: null,
            warehouseName: '',
            warehouseCode: '',    
        };
      })
      .catch(error => {
            console.log(error);
      });
    },
  },
  created() {
    this.loadTableData();
  }
}
</script>
<style scoped>

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
