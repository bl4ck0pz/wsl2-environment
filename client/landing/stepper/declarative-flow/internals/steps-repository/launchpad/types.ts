//TODO: Temporary export until we can replace all dependencies with ./types.ts Task;
export type { Task } from '@automattic/launchpad';
import { ChecklistStatuses, SiteDetails } from '@automattic/data-stores';
import { Task } from '@automattic/launchpad';
import { MinimalRequestCartProduct } from '@automattic/shopping-cart';
import { NavigationControls } from '../../types';

export type LaunchpadChecklist = Task[];

export interface LaunchpadFlowTaskList {
	[ string: string ]: string[];
}

export interface TranslatedLaunchpadStrings {
	flowName: string;
	title: string;
	launchTitle?: string;
	subtitle: string;
}

export type TaskId =
	| 'setup_free'
	| 'design_selected'
	| 'design_completed'
	| 'design_edited'
	| 'domain_upsell'
	| 'first_post_published'
	| 'site_launched'
	| 'plan_selected'
	| 'site_launched';

export interface TaskContext {
	tasks: Task[];
	site: SiteDetails | null;
	siteInfoQueryArgs?: { siteId?: number; siteSlug?: string | null };
	checklistStatuses?: ChecklistStatuses;
	isEmailVerified?: boolean;
	planCartItem?: MinimalRequestCartProduct | null;
	domainCartItem?: MinimalRequestCartProduct | null;
	productCartItems?: MinimalRequestCartProduct[] | null;
	siteSlug: string | null;
	submit: NavigationControls[ 'submit' ];
	displayGlobalStylesWarning: boolean;
	shouldDisplayWarning: boolean;
	globalStylesMinimumPlan: string;
	isVideoPressFlowWithUnsupportedPlan: boolean;
}

export type TaskAction = ( task: Task, flow: string, context: TaskContext ) => Task;
export type TaskActionTable = Record< TaskId, TaskAction >;
