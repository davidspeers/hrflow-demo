import { getCategoryColor } from "@helpers/getCategoryColor";
import { render } from "@testing-library/react";
import JobCategory from "@types/JobCategory";
import { expect, test } from "vitest";
import DemoCategoryBadge from "./DemoCategoryBadge";

Object.values(JobCategory).forEach((category) => {
  test(`applies correct color for '${category}' category`, () => {
    const { container } = render(<DemoCategoryBadge category={category} />);
    const badge = container.firstChild;
    expect(badge.className).to.include(getCategoryColor(category));
  });
});
