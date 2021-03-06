﻿'use strict';
define(
    [
        'marionette',
        'jquery',
        'Health/HealthView',
        'History/Queue/QueueView',
        'Navbar/Search'
    ], function (Marionette, $, HealthView, QueueView) {
        return Marionette.Layout.extend({
            template: 'Navbar/NavbarLayoutTemplate',

            regions: {
                health : '#x-health',
                queue  : '#x-queue-count'
            },

            ui: {
                search: '.x-series-search',
                collapse: '.x-navbar-collapse'
            },

            events: {
                'click a': 'onClick'
            },

            onRender: function () {
                this.ui.search.bindSearch();
                this.health.show(new HealthView());
                this.queue.show(new QueueView());
            },

            onClick: function (event) {

                event.preventDefault();

                var target = $(event.target);

                //look down for <a/>
                var href = event.target.getAttribute('href');

                //if couldn't find it look up'
                if (!href && target.closest('a') && target.closest('a')[0]) {

                    var linkElement = target.closest('a')[0];

                    href = linkElement.getAttribute('href');
                    this.setActive(linkElement);
                }
                else {
                    this.setActive(event.target);
                }

                if ($(window).width() < 768) {
                    this.ui.collapse.collapse('hide');
                }
            },

            setActive: function (element) {
                //Todo: Set active on first load
                this.$('a').removeClass('active');
                $(element).addClass('active');
            }
        });
    });
