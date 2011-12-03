/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Adblock Plus.
 *
 * The Initial Developer of the Original Code is
 * Wladimir Palant.
 * Portions created by the Initial Developer are Copyright (C) 2006-2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * @fileOverview FilterNotifier class manages listeners and distributes messages
 * about filter changes to them.
 */

var EXPORTED_SYMBOLS = ["FilterNotifier"];

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

/**
 * List of registered listeners
 * @type Array of function(action, item, newValue, oldValue)
 */
let listeners = [];

/**
 * This class allows registering and triggering listeners for filter events.
 * @class
 */
var FilterNotifier =
{
  /**
   * Adds a listener
   */
  addListener: function(/**function(action, item, newValue, oldValue)*/ listener)
  {
    if (listeners.indexOf(listener) >= 0)
      return;

    listeners.push(listener);
  },

  /**
   * Removes a listener that was previosly added via addListener
   */
  removeListener: function(/**function(action, item, newValue, oldValue)*/ listener)
  {
    let index = listeners.indexOf(listener);
    if (index >= 0)
      listeners.splice(index, 1);
  },

  /**
   * Notifies listeners about an event
   * @param {String} action event code ("load", "save", "elemhideupdate",
   *                 "subscription.added", "subscription.removed",
   *                 "subscription.disabled", "subscription.title",
   *                 "subscription.lastDownload", "subscription.downloadStatus",
   *                 "subscription.homepage", "subscription.updated",
   *                 "filter.added", "filter.removed", "filter.moved",
   *                 "filter.disabled", "filter.hitCount", "filter.lastHit")
   * @param {Subscription|Filter} item item that the change applies to
   */
  triggerListeners: function(action, item, param1, param2, param3)
  {
    for each (let listener in listeners)
      listener(action, item, param1, param2, param3);
  }
};