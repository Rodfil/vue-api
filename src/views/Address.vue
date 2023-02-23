<template>
  <!-- Form -->
    <el-button type="success"  @click="dialogFormVisible = true">Add Address</el-button>
     <el-dialog v-model="dialogFormVisible" title="Address">
        <el-form :model="form">
          <el-form-item label="Street" :label-width="formLabelWidth">
            <el-input v-model="form.street" autocomplete="off" />
          </el-form-item>
          <el-form-item label="City" :label-width="formLabelWidth">
            <el-input v-model="form.city" autocomplete="off" />
          </el-form-item>
          <el-form-item label="State" :label-width="formLabelWidth">
            <el-input v-model="form.state" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Postal Code" :label-width="formLabelWidth">
            <el-input v-model="form.postalCode" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Country" :label-width="formLabelWidth">
            <el-input v-model="form.country" autocomplete="off" />
          </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">  
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="form.addressId ? updateWarehouse() : addWarehouse()">
                {{ form.addressId ? 'Update' : 'Add' }}
            </el-button>
          </span>
        </template>
      </el-dialog>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Street" width="180" prop="street">

          </el-table-column>
          <el-table-column label="City" width="180" prop="city">
            
          </el-table-column>

          <el-table-column label="State" width="180" prop="state">
            
          </el-table-column>

          <el-table-column label="Postal Code" width="180" prop="postalCode">
            
          </el-table-column>
          <el-table-column label="Country" width="180" prop="country">
            
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
        addressId: null,  
        street: '',
        state: '',
        city: '',
        postalCode: '',
        country: ''        
      },
      dialogFormVisible: false,
      tableData: [],
    };
  },
  methods: {
    addWarehouse() {
        axios.post('https://localhost:7040/api/Address', {
        street: this.form.street,
        state: this.form.state,
        city: this.form.city,
        postalCode: this.form.postalCode,
        country: this.form.country
      })
        .then(response => {
          console.log(response.data)
          this.dialogFormVisible = false;
          this.loadTableData();

          Swal.fire({
            icon: 'sucess',
            title: 'Address Added Successfully',
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTableData() {
      axios.get('https://localhost:7040/api/Address')
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
          axios.delete(`https://localhost:7040/api/Address/${row.addressId}`)
            .then(response => {
              console.log(response.data);
              this.loadTableData();
            })
            .catch(error => {
                console.log(error);
            });
            Swal.fire({
              icon: 'success',
              title: 'Address has been deleted!'
            }) 
        }
      })
    },
    editWarehouse(row) {
      this.form.addressId = row.addressId;
      this.form.street = row.street;
      this.form.state = row.state;
      this.form.city = row.city;
      this.form.postalCode = row.postalCode;
      this.form.country = row.country;

      this.dialogFormVisible = true;  
    },
    updateWarehouse() {
      axios.put(`https://localhost:7040/api/Address/${this.form.addressId}`, {
        street: this.form.street,
        state: this.form.state,
        city: this.form.city,
        postalCode: this.form.postalCode,
        country: this.form.country,
        addressId: this.form.addressId
      })
      .then(response => {
        console.log(response.data)
        this.dialogFormVisible = false;
        this.loadTableData();

        Swal.fire({
          icon: 'success',
          title: 'Address updated successfully',
          showConfirmButton: false,
          timer: 1000
        });
        this.form = {
          addressId: null,
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
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