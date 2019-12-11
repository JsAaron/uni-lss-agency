<template>
	<view>
		<view style="padding: 0px 0px;">
			<view
				class="filter-content"
				v-for="(item, index) in menuList"
				:key="index"
				v-if="menuIndex == index"
			>
				<view v-if="item.isSort">
					<view class="filter-content-list">
						<view
							v-for="(detailItem, idx) in selectDetailList"
							:key="idx"
							:class="
								detailItem.isSelected
									? 'filter-content-list-item-active'
									: 'filter-content-list-item-default'
							"
							:style="{ color: detailItem.isSelected ? themeColor : '#666666' }"
							@tap="sortTap(idx, selectDetailList, item.key)"
						>
							<text>{{ detailItem.title }}</text>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="filter-content-title" v-if="item.detailTitle && item.detailTitle.length">
						<text>{{ item.detailTitle }}</text>
					</view>
					<view class="filter-content-detail">
						<!-- 新增日期 -->
						<view class="filter-date-item" v-if="item.key == 'pay_date'">
							<view class="filter-date">
								<picker
									class="filter-date-picker"
									mode="date"
									:value="startDataValue"
									:start="startDate"
									:end="endDate"
									@change="bindStartDateChange"
								>
									<view class="filter-date">{{ startDataValue }}</view>
								</picker>
								<text class="filter-date-text">-</text>
								<picker
									class="filter-date-picker"
									mode="date"
									:value="endDataValue"
									:start="startDate"
									:end="endDate"
									@change="bindEndDateChange"
								>
									<view class="uni-input">{{ endDataValue }}</view>
								</picker>
							</view>
						</view>
						<text
							v-else
							v-for="(detailItem, idx) in selectDetailList"
							:key="idx"
							class="filter-content-detail-item-default"
							:style="{
								'background-color': detailItem.isSelected ? themeColor : '#FFFFFF',
								color: detailItem.isSelected ? '#FFFFFF' : '#666666'
							}"
							@tap="itemTap(idx, selectDetailList, item.isMutiple, item.key)"
						>
							{{ detailItem.title }}
						</text>
					</view>
					<view class="filter-content-footer">
						<view
							class="filter-content-footer-item"
							style="color: #777777; background-color: #FFFFFF;"
							@tap="resetClick(selectDetailList, item.key)"
						>
							<text>重置</text>
						</view>
						<view
							class="filter-content-footer-item"
							:style="{ color: '#FFFFFF', 'background-color': themeColor }"
							@tap="sureClick"
						>
							<text>确定</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			title: 'picker',
			index: 0,
			startDataValue: this.getDate('last'),
			endDataValue: currentDate,

			selectArr: [],
			result: {},
			menuIndex: 0,
			selectDetailList: [],
			independenceObj: {},
			selectedKey: '',
			cacheSelectedObj: {},
			defaultSelectedTitleObj: {}
		};
	},
	props: {
		themeColor: {
			type: String,
			default() {
				return '#D1372C';
			}
		},
		menuList: {
			type: Array,
			default() {
				return [];
			}
		},
		independence: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
		selectedTitleObj() {
			let obj = {};
			for (let i = 0; i < this.menuList.length; i++) {
				let item = this.menuList[i];
				obj[item.key] = item.title;
			}
			return obj;
		},
		defaultSelectedObj() {
			// 保存初始状态
			return this.getSelectedObj();
		},
		selectedObj: {
			get() {
				return this.getSelectedObj();
			},
			set(newObj) {
				return newObj;
			}
		}
	},
	methods: {
		initDate() {
			this.result = {
				pay_date: {
					start: this.startDataValue,
					end: this.endDataValue
				}
			};
		},

		bindStartDateChange(e) {
			this.startDataValue = e.target.value;
			this.initDate();
		},

		bindEndDateChange(e) {
			this.endDataValue = e.target.value;
			this.initDate();
		},

		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			} else if (type === 'last') {
				month = month - 1;
			}

			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		getSelectedObj() {
			let obj = {};
			for (let i = 0; i < this.menuList.length; i++) {
				let item = this.menuList[i];
				if (
					!this.independence &&
					item.defaultSelectedIndex != null &&
					item.defaultSelectedIndex.toString().length > 0
				) {
					// 处理并列菜单默认值

					if (item.isMutiple) {
						obj[item.key] = [];
						item.detailList[0].isSelected = false;
						if (!Array.isArray(item.defaultSelectedIndex)) {
							// 如果默认值不是数组
							item.defaultSelectedIndex = [item.defaultSelectedIndex];
						}
						for (let j = 0; j < item.defaultSelectedIndex.length; j++) {
							// 将默认选中的值放入selectedObj
							item.detailList[item.defaultSelectedIndex[j]].isSelected = true;
							obj[item.key].push(item.detailList[item.defaultSelectedIndex[j]].value);
						}
					} else {
						obj[item.key] = item.detailList[item.defaultSelectedIndex].value;
						this.selectedTitleObj[item.key] = item.detailList[item.defaultSelectedIndex].title;
						this.defaultSelectedTitleObj[item.key] =
							item.detailList[item.defaultSelectedIndex].title;
						item.detailList[0].isSelected = false;
						item.detailList[item.defaultSelectedIndex].isSelected = true;
					}
				} else {
					if (item.isMutiple) {
						obj[item.key] = [];
					} else {
						obj[item.key] = '';
					}
				}
			}
			this.result = obj;
			return obj;
		},
		// 重置所有选项，包括默认选项，并更新result
		resetAllSelect(callback) {
			let titles = [];
			for (let i = 0; i < this.menuList.length; i++) {
				this.resetSelected(this.menuList[i].detailList, this.menuList[i].key);
				if (this.menuList[i].title) {
					titles[this.menuList[i].key] = this.menuList[i].title;
				}
			}
			let obj = {
				result: this.result,
				titles: titles,
				isReset: true
			};
			this.$emit('confirm', obj);
			callback(this.result);
		},
		// 重置选项为设置的默认值，并更新result
		resetSelectToDefault(callback) {
			for (let i = 0; i < this.menuList.length; i++) {
				this.selectDetailList = this.menuList[i].detailList;

				if (this.menuList[i].defaultSelectedIndex) {
					if (Array.isArray(this.menuList[i].defaultSelectedIndex)) {
						// 把所有默认的为false的点为true
						for (let j = 0; j < this.menuList[i].defaultSelectedIndex.length; j++) {
							if (
								this.selectDetailList[this.menuList[i].defaultSelectedIndex[j]].isSelected == false
							) {
								this.itemTap(
									this.menuList[i].defaultSelectedIndex[j],
									this.selectDetailList,
									this.menuList[i].isMutiple,
									this.menuList[i].key
								);
							}
						}
					} else {
						this.itemTap(
							this.menuList[i].defaultSelectedIndex,
							this.selectDetailList,
							this.menuList[i].isMutiple,
							this.menuList[i].key
						);
					}

					// 获取非默认项的下标
					let unDefaultSelectedIndexArr = this.getUnDefaultSelectedIndex(this.menuList[i]);
					// 把所有不是默认的为true的点为false
					for (let j = 0; j < unDefaultSelectedIndexArr.length; j++) {
						if (this.selectDetailList[unDefaultSelectedIndexArr[j]].isSelected == true) {
							this.itemTap(
								unDefaultSelectedIndexArr[j],
								this.selectDetailList,
								this.menuList[i].isMutiple,
								this.menuList[i].key
							);
						}
					}
				}
			}

			this.selectedObj = this.defaultSelectedObj;
			this.result = this.defaultSelectedObj;
			let obj = {
				result: this.result,
				titles: this.defaultSelectedTitleObj,
				isReset: true
			};
			this.$emit('confirm', obj);
			callback(this.result);
		},
		getUnDefaultSelectedIndex(menuListItem) {
			// 获取非默认项
			let tempDefault = menuListItem.defaultSelectedIndex;
			if (!Array.isArray(tempDefault)) {
				tempDefault = [tempDefault];
			}
			// 获取所有项的下标 组成新的数组
			let all = [];
			for (let i = 0; i < menuListItem.detailList.length; i++) {
				all.push(i);
			}
			// 将默认选中的数组与所有项的数组的不同值合并为一个新数组
			var unDefaultSelectedIndex = tempDefault
				.filter(function(v) {
					return !(all.indexOf(v) > -1);
				})
				.concat(
					all.filter(function(v) {
						return !(tempDefault.indexOf(v) > -1);
					})
				);
			return unDefaultSelectedIndex;
		},
		resetMenuList(val) {
			this.menuList = val;
			this.$emit('update:menuList', val);
		},
		menuTabClick(index) {
			this.menuIndex = index;
			this.selectDetailList = this.menuList[index].detailList;
			this.selectedKey = this.menuList[index].key;
			// 如果是独立菜单
			if (this.independence && !this.menuList[index].isSort) {
				if (JSON.stringify(this.independenceObj) == '{}') {
					this.initIndependenceObj(index);
				} else {
					for (let key in this.independenceObj) {
						if (key != this.selectedKey) {
							this.initIndependenceObj(index);
							this.resetSelected(this.menuList[index].detailList, this.selectedKey);
						}
					}
				}
			}
			if (this.independence && this.menuList[index].isSort) {
				this.independenceObj = {};
			}
			if (this.independence) {
				let idx = this.menuList[index].defaultSelectedIndex;
				if (idx != null && idx.toString().length > 0) {
					// 处理独立菜单默认值
					if (this.menuList[index].isMutiple) {
						for (let i = 0; i < idx.length; i++) {
							if (this.menuList[index].detailList[idx[i]].isSelected == false) {
								this.itemTap(idx[i], this.menuList[index].detailList, true, this.selectedKey);
							}
						}
					} else {
						if (this.menuList[index].detailList[idx].isSelected == false) {
							this.itemTap(idx, this.menuList[index].detailList, false, this.selectedKey);
						}
					}
				}
			}

			// #ifdef H5
			this.selectedObj = this.selectedObj;
			this.$forceUpdate();
			// #endif
		},
		initIndependenceObj(index) {
			this.independenceObj = {};
			if (this.menuList[index].isMutiple) {
				this.independenceObj[this.selectedKey] = [];
			} else {
				this.independenceObj[this.selectedKey] = '';
			}
		},
		itemTap(index, list, isMutiple, key) {
			if (isMutiple == true) {
				list[index].isSelected = !list[index].isSelected;
				if (index == 0) {
					this.resetSelected(list, key);
					if (!this.independence) {
						this.selectedTitleObj[key] = list[index].title;
					}
				} else {
					list[0].isSelected = false;
					if (list[index].isSelected) {
						if (this.independence) {
							this.independenceObj[this.selectedKey].push(list[index].value);
						} else {
							this.selectedObj[key].push(list[index].value);
						}
					} else {
						list[index].isSelected = false;
						if (this.independence) {
							var idx = this.independenceObj[this.selectedKey].indexOf(list[index].value);
							this.independenceObj[this.selectedKey].splice(idx, 1);
						} else {
							var idx = this.selectedObj[key].indexOf(list[index].value);
							this.selectedObj[key].splice(idx, 1);
						}
					}
					if (this.independence) {
						this.result = this.independenceObj;
					} else {
						this.result = this.selectedObj;
					}
				}
			} else {
				if (index == 0) {
					this.resetSelected(list, key);
					if (!this.independence) {
						this.selectedTitleObj[key] = list[index].title;
					}
				} else {
					list[0].isSelected = false;
					if (this.independence) {
						this.independenceObj[this.selectedKey] = list[index].value;
						this.result = this.independenceObj;
					} else {
						this.selectedObj[key] = list[index].value;
						this.result = this.selectedObj;
						this.selectedTitleObj[key] = list[index].title;
					}

					for (let i = 0; i < list.length; i++) {
						if (index == i) {
							list[i].isSelected = true;
						} else {
							list[i].isSelected = false;
						}
					}
				}
			}
			// #ifdef H5
			this.$forceUpdate();
			// #endif
		},
		resetSelected(list, key) {
			if (typeof this.result[key] == 'object') {
				this.result[key] = [];
				if (list[0]) {
					this.selectedTitleObj[key] = list[0].title;
				}
			} else {
				this.result[key] = '';
				if (list[0]) {
					this.selectedTitleObj[key] = list[0].title;
				}
			}

			for (let i = 0; i < list.length; i++) {
				if (i == 0) {
					list[i].isSelected = true;
				} else {
					list[i].isSelected = false;
				}
			}
			// #ifdef H5
			this.$forceUpdate();
			// #endif
		},
		sortTap(index, list, key) {
			if (this.independence) {
				this.independenceObj[this.selectedKey] = list[index].value;
				this.result = this.independenceObj;
			} else {
				this.selectedObj[key] = list[index].value;
				this.result = this.selectedObj;
				this.selectedTitleObj[key] = list[index].title;
			}

			for (let i = 0; i < list.length; i++) {
				if (index == i) {
					list[i].isSelected = true;
				} else {
					list[i].isSelected = false;
				}
			}
			let obj = {
				result: this.result,
				titles: this.selectedTitleObj,
				isReset: false
			};
			this.$emit('confirm', obj);
		},
		sureClick() {
			let obj = {
				result: this.result,
				titles: this.selectedTitleObj,
				isReset: false
			};
			this.$emit('confirm', obj);
		},
		resetClick(list, key) {
			if (key == 'date') {
				const currentDate = this.getDate({
					format: true
				});
				this.startDataValue = this.getDate('last');
				this.endDataValue = currentDate;
			} else {
				this.resetSelected(list, key);
			}
		}
	}
};
</script>

<style>
.filter-content {
	background-color: #f6f7f8;
}

.filter-content-title {
	border-bottom: #eeeeee 1px solid;
	padding: 10px 15px;
	font-size: 13px;
	color: #999999;
}

.filter-content-detail {
	padding: 5px 15px;
}

.filter-content-detail-item-active {
	background-color: #d1372c;
	color: #ffffff;
	padding: 5px 15px;
	border-radius: 20px;
	margin-right: 10px;
	margin-top: 10px;
	display: inline-block;
	font-size: 14px;
}

.filter-content-detail-item-default {
	background-color: #ffffff;
	color: #666666;
	padding: 5px 15px;
	border-radius: 20px;
	margin-right: 10px;
	margin-top: 10px;
	display: inline-block;
	font-size: 14px;
}

.filter-content-footer {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 45px;
	margin-top: 10px;
}

.filter-content-footer-item {
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
}

.filter-content-list {
	padding: 5px 15px;
}

.filter-content-list-item-default {
	color: #666666;
	width: 100%;
	padding: 10px 0px;
}

.filter-content-list-item-default text {
	width: 90%;
	font-size: 14px;
	display: inline-block;
}

.filter-content-list-item-active {
	color: #d1372c;
	width: 100%;
	padding: 10px 0px;
}

.filter-content-list-item-active text {
	font-size: 14px;
	width: 90%;
	display: inline-block;
}

.filter-content-list-item-active:after {
	content: '✓';
}

.filter-date-item {
	margin-top: 20rpx;
}

.filter-date {
	display: flex;
	justify-content: center;
	align-items: center;
}

.filter-date-text {
	margin: 0 20rpx;
}

.filter-date-picker {
	padding: 10rpx 20rpx;
	background-color: #fff;
	background-image: none;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
}

.filter-date-picker:active {
	border-color: #409eff;
}
</style>
