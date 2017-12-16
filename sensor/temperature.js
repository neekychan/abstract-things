'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { temperature } = require('../values');

module.exports = Thing.capability(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'temperature';
	}

	static availableAPI(builder) {
		builder.event('temperature')
			.type('temperature')
			.description('Current temperature has changed')
			.done();

		builder.action('temperature')
			.description('Get the current temperature')
			.getterForState('temperature')
			.returns('temperature', 'Current temperature')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'temperature' ];
	}

	get temperature() {
		return this.value('temperature');
	}

	updateTemperature(temp) {
		this.updateValue('temperature', temperature(temp));
	}
});
