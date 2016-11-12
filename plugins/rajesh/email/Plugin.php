<?php
/**
 * Created by Rajeshwaran Paulchamy.
 * User: Rajeshwaran Paulchamy
 * Date: 28-Aug-2016
 * Time: 12:49 AM
 */

namespace rajesh\email;

use System\Classes\PluginBase;
use System\Classes\SettingsManager;
use Backend\Facades\Backend;

class Plugin extends PluginBase{

    /**
     * Returns information about this plugin, including plugin name and developer name.
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'email',
            'description' => 'email template',
            'author'      => 'Rajeshwaran Paulchamy',
            'icon'        => 'icon-leaf'
        ];
    }

    /*public function registerComponents()
    {
        return [
            'rajesh\email\Components\ContactForm' => 'contactForm',
        ];
    }

    public function registerPermissions()
    {
        return [
            'laminsanneh.flexicontact.access_settings' => [
                'tab'   => 'laminsanneh.flexicontact::lang.permissions.tab',
                'label' => 'laminsanneh.flexicontact::lang.permissions.settings'
            ],
        ];
    }

    public function registerSettings()
    {
        return [
            'settings' => [
                'label'       => 'laminsanneh.flexicontact::lang.strings.settings_label',
                'description' => 'laminsanneh.flexicontact::lang.strings.settings_desc',
                'category'    => 'Marketing',
                'icon'        => 'icon-cog',
                'class'       => 'LaminSanneh\FlexiContact\Models\Settings',
                'permissions' => ['laminsanneh.flexicontact.access_settings'],
                'order'       => 100
            ]
        ];
	}*/

    public function registerMailTemplates()
    {
        return [
            'rajesh.email::mail.careers' => 'rajesh.email::lang.strings.email_desc',
            'rajesh.email::mail.contactus' => 'rajesh.email::lang.strings.email_desc'
        ];
    }
}
