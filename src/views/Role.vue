<template>
  <!-- Form -->
    <el-button type="success"  @click="dialogFormVisible = true">Add Role</el-button>
     <el-dialog v-model="dialogFormVisible" title="Role">
        <el-form :model="form">
          <el-form-item label="Role Name" :label-width="formLabelWidth">
            <el-input v-model="form.roleName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Role Code" :label-width="formLabelWidth">
            <el-input v-model="form.roleCode" autocomplete="off" />
          </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">  
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="form.roleId ? updateWarehouse() : addWarehouse()">
                {{ form.roleId ? 'Update' : 'Add' }}
            </el-button>
          </span>
        </template>
      </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Role Name" width="180" prop="roleName">

          </el-table-column>
          <el-table-column label="Role Code" width="180" prop="roleCode">
            
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
        roleId: null,  
        roleName: '',
        roleCode: ''
      },
      dialogFormVisible: false,
      tableData: [],
    };
  },
  methods: {
    addWarehouse() {
        axios.post('https://localhost:7040/api/Role', {
        roleName: this.form.roleName,
        roleCode: this.form.roleCode
      })
        .then(response => {
          console.log(response.data)
          this.dialogFormVisible = false;
          this.loadTableData();

          Swal.fire({
            icon: 'sucess',
            title: 'Role Added Successfully',
            showConfirmButton: false,
            timer: 1000
          })
            this.form = {
            roleId: null,
            roleName: '',
            roleCode: '',    
          };
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTableData() {
      axios.get('https://localhost:7040/api/Role')
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
          axios.delete(`https://localhost:7040/api/Role/${row.roleId}`)
            .then(response => {
              console.log(response.data);
              this.loadTableData();
            })
            .catch(error => {
                console.log(error);
            });
            Swal.fire({
              icon: 'success',
              title: 'Role has been deleted!'
            }) 
        }
      })
    },
    editWarehouse(row) {
      this.form.roleId = row.roleId;
      this.form.roleName = row.roleName;
      this.form.roleCode = row.roleCode;

      this.dialogFormVisible = true;  
    },
    updateWarehouse() {
      axios.put(`https://localhost:7040/api/Role/${this.form.roleId}`, {
        roleName: this.form.roleName,
        roleCode: this.form.roleCode,
        roleId: this.form.roleId
      })
      .then(response => {
        console.log(response.data)
        this.dialogFormVisible = false;
        this.loadTableData();

        Swal.fire({
          icon: 'success',
          title: 'Role updated successfully',
          showConfirmButton: false,
          timer: 1000
        });
        this.form = {
            roleId: null,
            roleName: '',
            roleCode: '',    
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