<template>
    <!-- Form -->
      <el-button type="success"  @click="dialogFormVisible = true">Add User</el-button>
       <el-dialog v-model="dialogFormVisible" title="User">
          <el-form :model="form">
            <el-form-item label="Name" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Phone Number" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Email Address" :label-width="formLabelWidth">
              <el-input v-model="form.emailAddress" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Age" :label-width="formLabelWidth">
              <el-input v-model="form.age" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">  
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="form.peopleId ? updateWarehouse() : addWarehouse()">
                  {{ form.peopleId ? 'Update' : 'Add' }}
              </el-button>
            </span>
          </template>
        </el-dialog>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="Name" width="180" prop="name">
  
            </el-table-column>
            <el-table-column label="Phone Number" width="180" prop="phoneNumber">
              
            </el-table-column>
  
            <el-table-column label="Email Address" width="180" prop="emailAddress">
              
            </el-table-column>
  
            <el-table-column label="Age" width="180" prop="age">
              
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
          peopleId: null,  
          name: '',
          phoneNumber: '',
          emailAddress: '',
          age: ''     
        },
        dialogFormVisible: false,
        tableData: [],
        listOfAddress: []
      };
    },
    methods: {
      addWarehouse() {
          axios.post('https://localhost:7040/api/People', {
          name: this.form.name,
          phoneNumber: this.form.phoneNumber,
          emailAddress: this.form.emailAddress,
          age: this.form.age
        })
          .then(response => {
            console.log(response.data)
            this.dialogFormVisible = false;
            this.loadTableData();
  
            Swal.fire({
              icon: 'sucess',
              title: 'User Added Successfully',
              showConfirmButton: false,
              timer: 1000
            })
            this.form = {
                peopleId: null,
                name: '',
                phoneNumber: '',
                emailAddress: '',
                age: ''
            };
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTableData() {
        axios.get('https://localhost:7040/api/People')
          .then(response => {
            this.tableData = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getAddress() {
        axios.get('https://localhost:7040/api/Address')
           .then(response => {
                this.listOfAddress = response.data;
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
            axios.delete(`https://localhost:7040/api/People/${row.peopleId}`)
              .then(response => {
                console.log(response.data);
                this.loadTableData();
              })
              .catch(error => {
                  console.log(error);
              });
              Swal.fire({
                icon: 'success',
                title: 'User has been deleted!'
              }) 
          }
        })
      },
      editWarehouse(row) {
        this.form.peopleId = row.peopleId;
        this.form.name = row.name;
        this.form.phoneNumber = row.phoneNumber;
        this.form.emailAddress = row.emailAddress;
        this.form.age = row.age;
  
        this.dialogFormVisible = true;  
      },
      updateWarehouse() {
        axios.put(`https://localhost:7040/api/People/${this.form.peopleId}`, {
          name: this.form.name,
          phoneNumber: this.form.phoneNumber,
          emailAddress: this.form.emailAddress,
          age: this.form.age,
          peopleId: this.form.peopleId
        })
        .then(response => {
          console.log(response.data)
          this.dialogFormVisible = false;
          this.loadTableData();
  
          Swal.fire({
            icon: 'success',
            title: 'User updated successfully',
            showConfirmButton: false,
            timer: 1000
          });
          this.form = {
                peopleId: null,
                name: '',
                phoneNumber: '',
                emailAddress: '',
                age: ''
            };
        })
        .catch(error => {
              console.log(error);
        });
      },
    },
    created() {
      this.loadTableData();
    },
    mounted() {
        this.getAddress();
    }
  }
  </script> 