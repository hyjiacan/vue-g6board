<template>
  <el-dialog :title="title" :visible.sync="isVisible" @closed="onClose" :width="width" :close-on-click-modal="false"
    :close-on-press-escape="false" custom-class="g6-board--dialog" append-to-body>
    <el-form size="small" ref="form" :model="form" :rules="rules" label-width="100px" :style="styles">
      <template v-for="field in data">
        <el-form-item :key="field._id" :label="field.label" :prop="field.name" v-show="field.config.isVisible()">
          <el-input v-if="field.inputType === InputTypes.TEXT" v-model.trim="form[field.name]"
            :minlength="field.config.minlength" :maxlength="field.config.maxlength" @change="onChange(field)"
            :placeholder="field.config.placeholder" :readonly="field.config.readonly" :style="field.style"></el-input>

          <el-input v-else-if="field.inputType === InputTypes.LONGTEXT" type="textarea" v-model.trim="form[field.name]"
            :minlength="field.config.minlength" :maxlength="field.config.maxlength" :rows="5" @change="onChange(field)"
            :placeholder="field.config.placeholder" :readonly="field.config.readonly" :style="field.style"
            show-word-limit></el-input>

          <el-input-number v-else-if="field.inputType === InputTypes.NUMBER" v-model.number="form[field.name]"
            :max="field.config.maxlength" :min="field.config.minlength" :precision="field.config.precision"
            :placeholder="field.config.placeholder" :readonly="field.config.readonly" :controls="false"
            @change="onChange(field)" :style="field.style"></el-input-number>

          <el-switch v-else-if="field.inputType === InputTypes.SWITCH" v-model.number="form[field.name]"
            @change="onChange(field)" :readonly="field.config.readonly" :style="field.style" active-text=""
            inactive-text=""></el-switch>

          <el-select v-else-if="field.inputType === InputTypes.SELECT &&
            field.config.optionsLoader
            " v-model="form[field.name]" :placeholder="field.config.placeholder" :loading="field.config.optionsLoading"
            :remote-method="field.config.optionsLoader.bind(field, {
              data: form,
              fields: fieldsMap,
            })" :disabled="field.config.readonly" :style="field.style" @change="onChange(field)"
            popper-class="g6-board--dialog-select-opions" filterable remote>
            <template #prefix v-if="getSelectIcon(field)">
              <img class="select-icon" :src="getSelectIcon(field)" />
            </template>

            <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value"
              :title="item.title">
              <img v-if="item.icon" class="select-icon" :src="item.icon" />
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>

          <el-select v-else-if="field.inputType === InputTypes.SELECT" v-model="form[field.name]"
            :placeholder="field.config.placeholder" :disabled="field.config.readonly" :style="field.style"
            popper-class="g6-board--dialog-select-opions" @change="onChange(field)" filterable>
            <template #prefix v-if="getSelectIcon(field)">
              <img class="select-icon" :src="getSelectIcon(field)" />
            </template>

            <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value"
              :title="item.title">
              <img v-if="item.icon" class="select-icon" :src="item.icon" />
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>

          <el-checkbox-group v-else-if="field.inputType === InputTypes.CHECKBOX" v-model="form[field.name]"
            :disabled="field.config.readonly" :style="field.style" @change="onChange(field)">
            <el-checkbox v-for="item in field.options" :key="item.value" :label="item.label" :title="item.title"
              :value="item.value"></el-checkbox>
          </el-checkbox-group>

          <el-radio-group v-else-if="field.inputType === InputTypes.RADIO" v-model="form[field.name]"
            :disabled="field.config.readonly" :style="field.style" @change="onChange(field)">
            <el-radio v-for="item in field.options" :key="item.value" :label="item.value" :title="item.title">{{
              item.label }}</el-radio>
          </el-radio-group>

          <component v-else-if="field.inputType === InputTypes.CUSTOM && field.component" v-model="form[field.name]"
            :disabled="field.config.readonly" :style="field.style" :is="field.component" @change="onChange(field)" />

          <div class="input-tip" v-if="field.config.tip">
            {{ field.config.tip }}
          </div>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onOk">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { InputTypes, FieldConfig } from "./models";

export default {
  props: {
    // 属性列表，使用类型 Fields 传入
    fields: {
      type: Array,
      required: true,
    },
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 是否可见
    visible: {
      type: Boolean,
      required: true,
    },
    // 表单数据
    value: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: "600px",
    },
    styles: {
      type: [Object, String],
      default: () => {
        return {
          padding: "0 40px 0 0",
        };
      },
    },
    graph: Object,
  },
  data() {
    return {
      InputTypes,
      isVisible: false,
      data: [],
      form: {},
      rules: {},
      // 标记量，用于在触发事件时，不执行 watch，以避免数据被循环处理
      noWatch: false,
      fieldsMap: {}
    };
  },
  watch: {
    value: {
      deep: true,
      handler() {
        if (this.noWatch) {
          this.noWatch = false;
          return;
        }
        this.processFields();
      },
    },
    visible(val) {
      this.isVisible = val;
    },
  },
  mounted() {
    this.processFields();
  },
  computed: {},
  methods: {
    processFields() {
      // 处理校验规则和表单字段
      const rules = {};
      const form = {
        id: `g6-data-${new Date().getTime()}-${Math.round(
          Math.random() * 10000
        )}`
      };

      const map = {};

      this.fields.forEach((field) => {
        field.config = Object.assign({}, FieldConfig, field.config);
        field.style = Object.assign({}, field.style);
        field._id = `g6-${new Date().getTime()}-${Math.round(
          Math.random() * 10000
        )}`;
        map[field.name] = field;
        const isVisible = field.config.isVisible
        field.config.isVisible = () => {
          if (typeof isVisible === 'boolean') {
            return isVisible
          }
          return isVisible({
            data: this.form,
            fields: this.fieldsMap
          })
        }

        const config = field.config;

        let defaultValue = config.default;

        if (field.inputType === InputTypes.CHECKBOX) {
          // 当输入类型为 checkbox 时，默认值应当为 []
          if (!defaultValue) {
            defaultValue = [];
          }
        } else if (field.inputType === InputTypes.SWITCH) {
          // 当输入类型为 switch 时，默认值应当为 false
          if (!defaultValue) {
            defaultValue = false;
          }
        } else if (field.inputType === InputTypes.NUMBER) {
          if (!field.config.minlength) {
            field.config.minlength = 0
          }
          if (!field.config.maxlength) {
            field.config.maxlength = Infinity
          }
        }
        form[field.name] = defaultValue;

        const validators = [];
        if (config.validators) {
          validators.push(...config.validators);
        }
        if (config.required) {
          validators.push({
            required: true,
            message: "不能为空",
          });
        }
        if (validators.length) {
          rules[field.name] = validators;
        }

        if (field.options instanceof Promise) {
          const promise = field.options
          field.options = []
          promise.then(data => {
            field.options = data
          })
        }
      });

      this.fieldsMap = map;
      this.data = this.fields;
      this.form = Object.assign({}, form, this.value);
      this.rules = rules;
    },
    onClose() {
      this.$emit("update:visible", this.isVisible);
    },
    getSelectIcon(field) {
      const value = this.form[field.name];
      if (!value) {
        return "";
      }
      const item = field.options.filter((opt) => opt.value === value)[0];
      if (!item) {
        return "";
      }
      return item.icon || "";
    },
    onCancel() {
      this.isVisible = false;
      this.form = {};
      this.data = [];
    },
    async onOk() {
      try {
        await new Promise((resolve, reject) => {
          this.$refs.form.validate((result) => {
            if (result) {
              resolve();
            } else {
              reject();
            }
          });
        });
      } catch (e) {
        return;
      }
      const form = {
        ...this.form
      };
      this.noWatch = true;
      this.$emit("input", form);
      this.$emit("ok", form);
    },
    onChange(field) {
      field.config.onchange.call(field, {
        type: 'change',
        field: field,
        value: this.form[field.name],
        data: this.form,
        fields: this.fieldsMap,
        graph: this.graph
      })
    }
  },
};
</script>
