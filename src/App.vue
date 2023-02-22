<script>
import { RouterLink } from 'vue-router';
import User from './views/User.vue';
import Address from './views/Address.vue';
import Warehouse from './views/Warehouse.vue';
import Role from './views/Role.vue';
import { ref } from 'vue'

export default {
  data() {
    return {
      selectedMenu: 'User',
    };
  },
  computed: {
    selectedView() {
      if(this.selectedMenu === 'User'){
        return User;
      } else if (this.selectedMenu === 'Address') {
        return Address;
      } else if (this.selectedMenu === 'Warehouse') {
        return Warehouse;
      } else {
        return Role;
      }
    },
  },
};

</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header>
        <div class="header-wrapper">
          <h1>Skanlog</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside class="sidebar">
          <nav>
            <div class="column">
              <RouterLink class="routerlink" to="/user" @click="selectedMenu = 'User'">Users</RouterLink>
              <RouterLink class="routerlink" to="/address" @click="selectedMenu = 'Address'">Address</RouterLink>
              <RouterLink class="routerlink" to="/warehouse" @click="selectedMenu = 'Warehouse'">Warehouse</RouterLink>
               <RouterLink class="routerlink" to="/role" @click="selectedMenu = 'Role'">Role</RouterLink>    
            </div>        
          </nav>
        </el-aside>
        <el-main class="main-table">
          <component :is="selectedView" class="child-table"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

  .sidebar {
    position: relative;
    background: teal;
    min-height: 100vh;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); 
    top: 60px;
    left: -1rem;
    padding: 2rem 2rem 2rem 2rem;
    font-size: 2rem;
  
  }

  .routerlink {
    display: block;
    padding: 5px;
    text-decoration: none;
    margin-bottom: 2rem;
    transition: all 0.2s ease-in-out;
    color: #ffff;
  }

  .routerlink:hover {
    background-color: black;
    transform: scale(0.95, 0.95, 1.1);
    border-radius: 10rem;
    padding: 1rem;  
  }

  .child {
    min-height:100vh;
    position: relative;
    width: 100rem;
  }

  .container {
    width: auto;
    height: auto;
    position: relative;
  }

  .header-wrapper h1 {
    padding-left: 5rem;
    font-size: 2rem;
  }
  .header-wrapper {
    background-color: #E8E8E8;
    box-shadow: 0 3px 10px rgb(190,190,190); 
    padding: 1rem;
    margin-left: -2.1rem;
    z-index: 99999;
    width: 94rem;
  }

  .main-table {
    margin-top: 4rem;
  }
</style>
