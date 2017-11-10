import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}

export class Utils {
  /**
   * Removes invalid/empty data from DTO
   *
   * @static
   * @param {any} [actualData={}]
   * @returns
   * @memberof SearchService
   */
  public static sanitizeData(actualData = {}): any {
    const keys = Object.keys(actualData);

    if (!keys.length) { return actualData; }

    keys.forEach(key => {
      const filterVal = actualData[key]
      const typeOfFilterVal = Object.prototype.toString.call(filterVal).match(/\s(:?\w+)/)[1];

      if (
        [null, undefined, ''].indexOf(filterVal) > -1 ||
        (typeOfFilterVal === 'Array' && !filterVal.length) ||
        (typeOfFilterVal === 'Object' && !Object.keys(filterVal).length)
      ) {
        delete actualData[key]
      }

      if (typeOfFilterVal === 'Object' && Object.keys(filterVal).length) {
        actualData[key] = this.sanitizeData(filterVal)
      }
    });

    return { ...actualData };
  }
}