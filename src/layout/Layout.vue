<template>
  <a-layout id="layout-base">
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="layout-base__sider"
      :trigger="null"
      collapsible
    >
      <div class="logo">{{ name }}</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :selectable="false"
        theme="dark"
        mode="inline"
        v-if="menuList.length"
      >
        <a-menu-item
          v-for="menu in menuList"
          :key="menu.key"
          :class="menu.class"
          @click="menuChange(menu)"
        >
          <component :is="menu.icon"></component>
          <span>{{ menu.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="collapsedChange"
        />
        <menu-fold-outlined v-else class="trigger" @click="collapsedChange" />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ProfileFilled,
  RocketFilled,
  ReadFilled,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface MenuItem {
  name: string;
  key: string;
  icon: string;
  class?: string;
  path?: string;
}

export default defineComponent({
  name: "LayoutBase",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProfileFilled,
    RocketFilled,
    ReadFilled,
    SettingOutlined,
  },
  setup() {
    let name = ref<string>("🥱FancyToys");
    const menuList: Array<MenuItem> = [
      {
        name: "Nursery",
        key: "nursery",
        icon: "ProfileFilled",
        path: "nursery",
      },
      {
        name: "Teleport",
        key: "teleport",
        icon: "RocketFilled",
        path: "teleport",
      },
      {
        name: "FancyServer",
        key: "fancyServer",
        icon: "ReadFilled",
        path: "fancy-server",
      },
      {
        name: "Setting",
        key: "setting",
        icon: "SettingOutlined",
        class: "bottom-menu",
      },
    ];
    let collapsed = ref<boolean>(false);
    const collapsedChange = () => {
      collapsed.value = !collapsed.value;
      if (!collapsed.value) {
        name.value = "🥱FancyToys";
      } else {
        name.value = "🥱";
      }
    };
    let selectedKeys = ref<string[]>(["Nursery"]);
    const router = useRouter();
    const menuChange: (menu: MenuItem) => void = ({ key, path }) => {
      if (key === "setting") {
        return;
      }
      selectedKeys.value = [key];
      console.log(selectedKeys.value);
      if (path) {
        router.push({
          path,
        });
      }
    };
    return {
      name,
      selectedKeys,
      collapsed,
      collapsedChange,
      menuList,
      menuChange,
    };
  },
});
</script>

<style lang="scss" scoped>
#layout-base .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout-base .trigger:hover {
  color: #1890ff;
}

#layout-base .logo {
  height: 32px;
  border-radius: 7px;
  background: linear-gradient(135deg, #17ead9, #6078ea);
  margin: 16px;
  font-size: 20px;
  color: #cddc39;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
}
.layout-base__sider {
  position: relative;
  ::v-deep .bottom-menu {
    position: absolute;
    bottom: 20px;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
