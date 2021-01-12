import { Theme } from '@/Services/App.service';
import React, { useState } from 'react';
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { CourseListItem } from '@/Services/GraphQlDataTypes/Courses';
import CourseCard from './CourseCard.component';


// ----- placement section start ----- \\
export function RenderPlacement() {
    return (
        <div>
            Placement
        </div>
    );
}
// ----- placement section end ----- \\
