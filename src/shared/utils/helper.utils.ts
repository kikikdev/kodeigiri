import {MetaPaginationDto, MetaProjectPlanningDto, MetaProjectPlanningActualizationDto} from "../dtos/meta-pagination.dto";
import * as path from "path";
import * as fs from "fs";

const moment = require('moment');

export function getOffset(page: number, limit: number): any {
    return {
        skip: (page - 1) * limit,
        take: limit
    };
}

export function getMeta(page: number, limit: number, count: number): MetaPaginationDto {
    return {
        page,
        limit,
        totalPage: Math.ceil(count / limit),
        totalData: count
    };
}

export function getMetaProjectPlanning(total_duration: number, total_weight: any, total_budged: any): MetaProjectPlanningDto {
    return {
        total_duration,
        total_weight,
        total_budged
    };
}

export function getMetaProjectPlanningActualization(planning_start_date: any, planning_finish_date: any, actualization_start_date: any, actualization_finish_date: any, running_day: any, running_date: any, planning_previous_cumulative: any, planning_total_cumulative: any, actualization_previous_cumulative: any, actualization_total_cumulative: any, deviation: any, progress_status: any): MetaProjectPlanningActualizationDto {
    return {
        planning_start_date,
        planning_finish_date,
        actualization_start_date,
        actualization_finish_date,
        running_day,
        running_date,
        planning_previous_cumulative,
        planning_total_cumulative,
        actualization_previous_cumulative,
        actualization_total_cumulative,
        deviation,
        progress_status
    };
}

export function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export function getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60);
}

export function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
}

export function getDifferenceInSeconds(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
}

export function objDeepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = objDeepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = objDeepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


export function objDiff(source: any, destination: any): any {

    const result = {
        status: false,
        data: {},
    } as any;

    for (const key of Object.keys(source)) {
        let valSource = source[key];
        let valDestination = destination[key];

        if (valSource instanceof Date) {
            try {
                valSource = valSource.toISOString();
            } catch (e) {
                valSource = '';
            }
            try {
                valDestination = valDestination.toISOString();
            } catch (e) {
                valDestination = '';
            }
        }

        if (valSource != valDestination) {
            result.data[key] = valSource;
            result.status = true;
        }
    }

    return result;
}

export function getExtFilename(f: any, newName: string): string {
    const name = path.basename(f.filename);
    const ext = path.extname(f.filename);
    const nameWithoutExt = path.basename(name, ext);

    const pathToFile = path.join("./files/", f.filename);
    const newPathToFile = path.join("./files/", newName + ext);

    fs.rename(pathToFile, newPathToFile, function (err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully renamed the file!")
        }
    });

    return newPathToFile;
}

export function ArrayObjRemoveDuplicate(arr) {
    const seen = new Set();
    return arr.filter(el => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
    });
}

export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function momentFormatDate() {
    return moment().format('YYYY-MM-DD');
}

export function momentAddDaysFormatDate(days: number) {
    return moment().add(days, 'days').format('YYYY-MM-DD');
}

export function dateStringNow() {
    return moment().startOf('day').format('YYYY-MM-DD');
}

export function dateNow(): Date {
    return new Date(momentFormatDate());
}

export function dateJsMilliseconds(): number {
    const d = new Date();
    return d.getTime();
}

export function dateAddDays(days: number): Date {
    return new Date(momentAddDaysFormatDate(days));
}

export function dateJsAddDays(date: Date, days: number) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy;
}

export function dateJsFromStr(str: string) {
    return new Date(str);
}

export function dateJsToDateStr(date: Date): string {
    return date.toISOString().slice(0, 10);
}

export function dateJsCompare(date1: Date, date2: Date): Boolean {
    return date1.getTime() === date2.getTime();
}

export function JsonStringifyParse(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}


