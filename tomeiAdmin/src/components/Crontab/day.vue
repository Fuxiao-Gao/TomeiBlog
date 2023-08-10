<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model='radioValue' :label="1">
				allowed wildcards[, - * ? / L W]
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="2">
				don't specify
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="3">
				cycle from
				<el-input-number v-model='cycle01' :min="1" :max="30" /> -
				<el-input-number v-model='cycle02' :min="cycle01 ? cycle01 + 1 : 2" :max="31" /> 日
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="4">
				from
				<el-input-number v-model='average01' :min="1" :max="30" /> 号开始，每
				<el-input-number v-model='average02' :min="1" :max="31 - average01 || 1" /> 日执行一次
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="5">
				per month
				<el-input-number v-model='workday' :min="1" :max="31" /> 号最近的那个工作日
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="6">
				the last day of the month
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="7">
				specify
				<el-select clearable v-model="checkboxList" placeholder="可多选" multiple style="width:100%">
					<el-option v-for="item in 31" :key="item" :value="item">{{item}}</el-option>
				</el-select>
			</el-radio>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			radioValue: 1,
			workday: 1,
			cycle01: 1,
			cycle02: 2,
			average01: 1,
			average02: 1,
			checkboxList: [],
			checkNum: this.$options.propsData.check
		}
	},
	name: 'crontab-day',
	props: ['check', 'cron'],
	methods: {
		radioChange() {
			('day rachange');
			if (this.radioValue !== 2 && this.cron.week !== '?') {
				this.$emit('update', 'week', '?', 'day')
			}

			switch (this.radioValue) {
				case 1:
					this.$emit('update', 'day', '*');
					break;
				case 2:
					this.$emit('update', 'day', '?');
					break;
				case 3:
					this.$emit('update', 'day', this.cycleTotal);
					break;
				case 4:
					this.$emit('update', 'day', this.averageTotal);
					break;
				case 5:
					this.$emit('update', 'day', this.workday + 'W');
					break;
				case 6:
					this.$emit('update', 'day', 'L');
					break;
				case 7:
					this.$emit('update', 'day', this.checkboxString);
					break;
			}
			('day rachange end');
		},
		// When two values of the cycle change
		cycleChange() {
			if (this.radioValue == '3') {
				this.$emit('update', 'day', this.cycleTotal);
			}
		},
		// When the average two values change
		averageChange() {
			if (this.radioValue == '4') {
				this.$emit('update', 'day', this.averageTotal);
			}
		},
		// When the workday value changes
		workdayChange() {
			if (this.radioValue == '5') {
				this.$emit('update', 'day', this.workdayCheck + 'W');
			}
		},
		// When the checkbox value changes
		checkboxChange() {
			if (this.radioValue == '7') {
				this.$emit('update', 'day', this.checkboxString);
			}
		}
	},
	watch: {
		'radioValue': 'radioChange',
		'cycleTotal': 'cycleChange',
		'averageTotal': 'averageChange',
		'workdayCheck': 'workdayChange',
		'checkboxString': 'checkboxChange',
	},
	computed: {
		// calculate the values for two cycles
		cycleTotal: function () {
			const cycle01 = this.checkNum(this.cycle01, 1, 30)
			const cycle02 = this.checkNum(this.cycle02, cycle01 ? cycle01 + 1 : 2, 31, 31)
			return cycle01 + '-' + cycle02;
		},
		// calculate the values for two averages
		averageTotal: function () {
			const average01 = this.checkNum(this.average01, 1, 30)
			const average02 = this.checkNum(this.average02, 1, 31 - average01 || 0)
			return average01 + '/' + average02;
		},
		// calculate the values for workday
		workdayCheck: function () {
			const workday = this.checkNum(this.workday, 1, 31)
			return workday;
		},
		// calculate the values for checkbox
		checkboxString: function () {
			let str = this.checkboxList.join();
			return str == '' ? '*' : str;
		}
	}
}
</script>
