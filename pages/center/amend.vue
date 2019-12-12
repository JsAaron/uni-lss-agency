<template>
	<view>
		<message ref="Message"></message>

		<QSInput
			:name="formName"
			variableName="oldPassword"
			title="原始密码"
			required
			password
			layout="row"
			titleLayout="left"
			passwordIconColor
			v-model="fromValue.oldPassword"
		></QSInput>

		<QSInput
			:name="formName"
			variableName="newPassword"
			title="新密码"
			required
			password
			layout="row"
			passwordIconColor
			titleLayout="left"
			v-model="fromValue.newPassword"
		></QSInput>

		<QSInput
			:name="formName"
			variableName="secondPassword"
			title="确定新密码"
			required
			passwordIconColor
			password
			layout="row"
			titleLayout="left"
			v-model="fromValue.secondPassword"
		></QSInput>

		<WButton
			text="修改密码"
			:rotate="fromValue.isRotate"
			@click.native="onEnsure()"
			bgColor="rgb(47, 133, 252)"
		></WButton>
	</view>
</template>

<script>
import * as util from '@/utils';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import { getPassword } from '@/api/agent';

export default {
	components: {},
	data() {
		return {
			formName: 'test',
			fromValue: {
				isRotate: false,
				oldPassword: '',
				newPassword: '',
				secondPassword: ''
			}
		};
	},
	props: {},
	created() {},
	onLoad() {},
	methods: {
		onEnsure() {
			QSApp.getForm(this.formName)
				.then(res => {
					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + '输入错误');
						return;
					}
					if (res.data.newPassword != res.data.secondPassword) {
						this.$refs['Message'].error('新密码设置不一致');
						return;
					}

					this.saveRequest(res.data);
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},
		saveRequest(data) {
			if (this.fromValue.isRotate) {
				return;
			}
			this.fromValue.isRotate = true;

			let query = {
				userid: util.cookies.get('uuid'),
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
				secondPassword: data.secondPassword
			};

			getPassword(query)
				.then(data => {
					this.fromValue.isRotate = false;
					if (data == '000') {
						this.$refs['Message'].success('修改成功');
					} else if (data == '001') {
						this.$refs['Message'].error('用户未登陆');
					} else if (data == '002') {
						this.$refs['Message'].error('两次新密码不一致');
					} else if (data == '003') {
						this.$refs['Message'].error('原密码错误');
					} else if (data == '004') {
						this.$refs['Message'].error('修改失败');
					}
				})
				.catch(err => {
					this.fromValue.isRotate = false;
				});
		}
	}
};
</script>

<style lang="scss"></style>
